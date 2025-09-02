package worker

import (
	"context"
	"encoding/json"
	"strings"
	"sync"
	"time"

	"github.com/codebyaadi/upzy/libs/logger"
	"github.com/codebyaadi/upzy/libs/models"
	"github.com/codebyaadi/upzy/services/ingestor/internal/batcher"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

type PoolConfig struct {
	StreamName   string
	GroupName    string
	WorkerCount  int
	BatchSize    int
	BatchTimeout time.Duration
}

type Pool struct {
	cfg         PoolConfig
	log         *logger.Logger
	redisClient *redis.Client
	pgPool      *pgxpool.Pool
	batcher     *batcher.Batcher
	wg          sync.WaitGroup
	shutdown    chan struct{}
}

func NewPool(cfg PoolConfig, log *logger.Logger, redisClient *redis.Client, pgPool *pgxpool.Pool) *Pool {
	return &Pool{
		cfg:         cfg,
		log:         log,
		redisClient: redisClient,
		pgPool:      pgPool,
		shutdown:    make(chan struct{}),
	}
}

func (p *Pool) Start(ctx context.Context) {
	p.log.Info("Starting ingestor worker pool", "workers", p.cfg.WorkerCount)

	// Initialize and start the batcher
	p.batcher = batcher.NewBatcher(p.pgPool, p.log, p.cfg.BatchSize, p.cfg.BatchTimeout)
	go p.batcher.Start(ctx)

	// Create the Redis consumer group
	if _, err := p.redisClient.XGroupCreateMkStream(ctx, p.cfg.StreamName, p.cfg.GroupName, "$").Result(); err != nil {
		if !strings.Contains(err.Error(), "BUSYGROUP") {
			p.log.Error("Error creating consumer group, shutting down", "error", err)
			return
		}
	}
	p.log.Info("Consumer group ready", "group", p.cfg.GroupName, "stream", p.cfg.StreamName)

	p.wg.Add(p.cfg.WorkerCount)
	for i := 0; i < p.cfg.WorkerCount; i++ {
		go p.worker(ctx, i+1)
	}
}

func (p *Pool) Shutdown() {
	p.log.Info("Shutting down worker pool...")
	close(p.shutdown)
	p.wg.Wait()
	p.batcher.Shutdown()
	p.log.Info("Worker pool shut down gracefully.")
}

func (p *Pool) worker(ctx context.Context, id int) {
	defer p.wg.Done()
	log := p.log.With("workerId", id)
	consumerName := "ingestor-" + uuid.NewString()
	log.Info("Worker started", "consumer", consumerName)

	for {
		select {
		case <-ctx.Done():
			log.Info("Worker shutting down due to context cancellation.")
			return
		case <-p.shutdown:
			log.Info("Worker shutting down.")
			return
		default:
			streams, err := p.redisClient.XReadGroup(ctx, &redis.XReadGroupArgs{
				Group:    p.cfg.GroupName,
				Consumer: consumerName,
				Streams:  []string{p.cfg.StreamName, ">"},
				Count:    10, // Read up to 10 messages at a time
				Block:    5 * time.Second,
			}).Result()

			if err != nil {
				if err != redis.Nil && err != context.Canceled {
					log.Warn("Error reading from stream", "error", err)
				}
				continue
			}

			for _, stream := range streams {
				for _, msg := range stream.Messages {
					p.processMessage(ctx, msg)
				}
			}
		}
	}
}

func (p *Pool) processMessage(ctx context.Context, msg redis.XMessage) {
	var result models.CheckResult
	payload, ok := msg.Values["payload"].(string)
	if !ok {
		p.log.Error("Invalid payload format", "messageId", msg.ID)
		p.ackMessage(ctx, msg.ID)
		return
	}

	if err := json.Unmarshal([]byte(payload), &result); err != nil {
		p.log.Error("Could not unmarshal JSON", "error", err, "messageId", msg.ID)
		p.ackMessage(ctx, msg.ID)
		return
	}

	// Send the valid result to the batcher
	p.batcher.Add(result)
	p.ackMessage(ctx, msg.ID)
}

func (p *Pool) ackMessage(ctx context.Context, id string) {
	p.redisClient.XAck(ctx, p.cfg.StreamName, p.cfg.GroupName, id)
}