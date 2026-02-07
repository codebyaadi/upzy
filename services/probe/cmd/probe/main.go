package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/codebyaadi/upzy/pkg/datastore/redis"
	"github.com/codebyaadi/upzy/pkg/logger"
	"github.com/codebyaadi/upzy/services/probe/internal/config"
	"github.com/codebyaadi/upzy/services/probe/internal/worker"
)

func main() {
	ctx := context.Background()

	cfg, err := config.Load()
	if err != nil {
		slog.Default().Error("Failed to load configuration", "error", err)
		os.Exit(1)
	}

	log := logger.New("Probe")
	log.Info("Configuration loaded", "region", cfg.Probe.Region)

	redisClient, err := redis.NewClient(ctx, cfg.Redis.URL, 5)
	if err != nil {
		log.Error("Failed to initialize Redis client", "error", err)
		os.Exit(1)
	}
	log.Info("Successfully connected to Redis via datastore.")

	poolCfg := worker.PoolConfig{
		Region:      cfg.Probe.Region,
		WorkerCount: cfg.Probe.WorkerCount,
	}

	pool, err := worker.NewPool(poolCfg, log, redisClient)
	if err != nil {
		log.Error("Failed to initialize worker pool", "error", err)
		os.Exit(1)
	}

	go pool.Start()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info("Shutdown signal received. Starting graceful shutdown...")
	pool.Shutdown()
	log.Info("Application has been shut down.")
}
