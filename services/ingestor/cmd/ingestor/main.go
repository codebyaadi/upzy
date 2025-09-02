package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/codebyaadi/upzy/libs/datastore/postgres"
	"github.com/codebyaadi/upzy/libs/datastore/redis"
	"github.com/codebyaadi/upzy/libs/logger"
	"github.com/codebyaadi/upzy/services/ingestor/internal/config"
	"github.com/codebyaadi/upzy/services/ingestor/internal/worker"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Load configuration from environment variables
	cfg, err := config.Load()
	if err != nil {
		slog.Default().Error("Failed to load configuration", "error", err)
		os.Exit(1)
	}

	log := logger.New("Ingestor")
	log.Info("Configuration loaded", "workers", cfg.Ingestor.WorkerCount, "batchSize", cfg.Ingestor.BatchSize)

	// Connect to Redis
	redisClient, err := redis.NewClient(ctx, cfg.Redis.URL, 5)
	if err != nil {
		log.Error("Failed to initialize Redis client", "error", err)
		os.Exit(1)
	}
	log.Info("Successfully connected to Redis.")

	// Connect to PostgreSQL (TimescaleDB)
	pgPool, err := postgres.NewConnectionPool(ctx, cfg.Postgres.URL, 5)
	if err != nil {
		log.Error("Failed to initialize PostgreSQL client", "error", err)
		os.Exit(1)
	}
	defer pgPool.Close()
	log.Info("Successfully connected to PostgreSQL.")

	// Configure and create the worker pool
	poolCfg := worker.PoolConfig{
		StreamName:      "results:http",
		GroupName:       "ingestor-group",
		WorkerCount:     cfg.Ingestor.WorkerCount,
		BatchSize:       cfg.Ingestor.BatchSize,
		BatchTimeout:    time.Duration(cfg.Ingestor.BatchTimeoutSec) * time.Second,
	}

	pool := worker.NewPool(poolCfg, log, redisClient, pgPool)

	// Start the worker pool in a separate goroutine
	go pool.Start(ctx)

	// Wait for a shutdown signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info("Shutdown signal received. Starting graceful shutdown...")
	cancel() // Notify all parts of the app to shut down
	pool.Shutdown()
	log.Info("Application has been shut down gracefully.")
}