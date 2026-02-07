package worker

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/codebyaadi/upzy/pkg/db"
	"github.com/codebyaadi/upzy/pkg/logger"
	"github.com/codebyaadi/upzy/services/probe/internal/checker"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
)

type Pool struct {
	cfg         PoolConfig
	log         *logger.Logger
	redisClient *redis.Client
	jobsChan    chan redis.XMessage
	wg          sync.WaitGroup
	shutdown    chan struct{}
}

type PoolConfig struct {
	Region      string
	WorkerCount int
}

func NewPool(cfg PoolConfig, log *logger.Logger, redisClient *redis.Client) (*Pool, error) {
	if redisClient == nil {
		return nil, fmt.Errorf("redis client cannot be nil")
	}

	return &Pool{
		cfg:         cfg,
		log:         log,
		redisClient: redisClient, // Assign the provided client
		jobsChan:    make(chan redis.XMessage, cfg.WorkerCount),
		shutdown:    make(chan struct{}),
	}, nil
}

func (p *Pool) Start() {
	p.log.Info("Starting worker pool", "region", p.cfg.Region, "workers", p.cfg.WorkerCount)
	p.wg.Add(p.cfg.WorkerCount)
	for i := 0; i < p.cfg.WorkerCount; i++ {
		go p.worker(i + 1)
	}
	p.consume()
}

func (p *Pool) Shutdown() {
	p.log.Info("Shutting down worker pool...")
	close(p.shutdown)
	close(p.jobsChan)
	p.wg.Wait()
	p.redisClient.Close()
	p.log.Info("Worker pool shut down gracefully.")
}

func (p *Pool) worker(id int) {
	defer p.wg.Done()
	log := p.log.With("workerId", id)
	log.Debug("Worker started and waiting for jobs.")

	streamName := fmt.Sprintf("jobs:checks:%s", p.cfg.Region)
	groupName := fmt.Sprintf("probes-%s", p.cfg.Region)

	for msg := range p.jobsChan {
		var job db.GetMonitorJobRow
		payload, ok := msg.Values["payload"].(string)
		if !ok {
			log.Error("Job failed: Invalid payload format (not a string)", "messageId", msg.ID)
			p.redisClient.XAck(context.Background(), streamName, groupName, msg.ID)
			continue
		}

		if err := json.Unmarshal([]byte(payload), &job); err != nil {
			log.Error("Job failed: Could not unmarshal JSON", "error", err, "messageId", msg.ID)
			p.redisClient.XAck(context.Background(), streamName, groupName, msg.ID)
			continue
		}

		log.Info("Processing job started", "monitorId", job.ID, "traceId", job.TraceID, "url", job.Url)

		var result db.Check
		switch job.Type {
		case "http", "https":
			result = checker.ExecuteHTTPCheck(job, p.cfg.Region)
		default:
			log.Warn("Unsupported monitor type", "type", job.Type, "monitorId", job.ID)
			result = db.Check{ /* ... error fields ... */ }
		}

		p.publishResult(result)
		p.redisClient.XAck(context.Background(), streamName, groupName, msg.ID)

		if result.IsSuccess {
			log.Info("Processing job finished", "monitorId", job.ID, "traceId", job.TraceID, "requestId", result.RequestID, "status", "Success")
		} else {
			log.Warn("Processing job finished", "monitorId", job.ID, "traceId", job.TraceID, "requestId", result.RequestID, "status", "Failed", "reason", result.ErrorMessage)
		}
	}
	log.Debug("Worker stopped")
}

func (p *Pool) consume() {
	ctx := context.Background()
	streamName := fmt.Sprintf("jobs:checks:%s", p.cfg.Region)
	groupName := fmt.Sprintf("probes-%s", p.cfg.Region)
	consumerName := fmt.Sprintf("probe-%s-%s", p.cfg.Region, uuid.New().String())

	if _, err := p.redisClient.XGroupCreateMkStream(ctx, streamName, groupName, "$").Result(); err != nil {
		if !strings.Contains(err.Error(), "BUSYGROUP") {
			p.log.Error("Error creating consumer group", "error", err)
			return
		}
	}
	p.log.Info("Consumer group ready, listening for jobs...", "group", groupName, "stream", streamName)

	for {
		select {
		case <-p.shutdown:
			p.log.Info("Consumer loop shutting down.")
			return
		default:
			streams, err := p.redisClient.XReadGroup(ctx, &redis.XReadGroupArgs{
				Group:    groupName,
				Consumer: consumerName,
				Streams:  []string{streamName, ">"},
				Count:    10,
				Block:    5 * time.Second,
			}).Result()

			if err != nil {
				if err != redis.Nil {
					p.log.Warn("Error reading from stream", "error", err)
				}
				continue
			}

			if len(streams) == 0 || len(streams[0].Messages) == 0 {
				p.log.Debug("No new jobs in stream, waiting...")
				continue
			}

			for _, stream := range streams {
				for _, message := range stream.Messages {
					p.jobsChan <- message
				}
			}
		}
	}
}

func (p *Pool) publishResult(result db.Check) {
	payload, err := json.Marshal(result)
	if err != nil {
		p.log.Error("Could not marshal result", "error", err, "monitorId", result.MonitorID)
		return
	}

	err = p.redisClient.XAdd(context.Background(), &redis.XAddArgs{
		Stream: "results:http",
		Values: map[string]any{"payload": string(payload)},
	}).Err()

	if err != nil {
		p.log.Error("Failed to publish result", "error", err, "monitorId", result.MonitorID)
	}
}
