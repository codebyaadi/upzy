package batcher

import (
	"context"
	"sync"
	"time"

	"github.com/codebyaadi/upzy/libs/logger"
	"github.com/codebyaadi/upzy/libs/models"
	"github.com/codebyaadi/upzy/services/ingestor/internal/store"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Batcher struct {
	store        *store.Store
	log          *logger.Logger
	batch        []models.CheckResult
	maxSize      int
	maxTimeout   time.Duration
	inputChan    chan models.CheckResult
	shutdownChan chan struct{}
	mutex        sync.Mutex
}

func NewBatcher(pool *pgxpool.Pool, log *logger.Logger, maxSize int, maxTimeout time.Duration) *Batcher {
	return &Batcher{
		store:        store.New(pool),
		log:          log,
		batch:        make([]models.CheckResult, 0, maxSize),
		maxSize:      maxSize,
		maxTimeout:   maxTimeout,
		inputChan:    make(chan models.CheckResult, maxSize*2),
		shutdownChan: make(chan struct{}),
	}
}

func (b *Batcher) Add(result models.CheckResult) {
	b.inputChan <- result
}

func (b *Batcher) Start(ctx context.Context) {
	ticker := time.NewTicker(b.maxTimeout)
	defer ticker.Stop()

	b.log.Info("Batcher started", "maxSize", b.maxSize, "maxTimeout", b.maxTimeout)

	for {
		select {
		case result := <-b.inputChan:
			b.mutex.Lock()
			b.batch = append(b.batch, result)
			batchSize := len(b.batch)
			b.mutex.Unlock()

			if batchSize >= b.maxSize {
				b.flush(ctx)
				ticker.Reset(b.maxTimeout) // Reset timer after a full batch flush
			}
		case <-ticker.C:
			b.flush(ctx)
		case <-ctx.Done():
			b.log.Info("Batcher shutting down due to context cancellation.")
			b.flush(context.Background()) // Final flush on shutdown
			return
		case <-b.shutdownChan:
			b.log.Info("Batcher shutting down.")
			b.flush(context.Background()) // Final flush on shutdown
			return
		}
	}
}

func (b *Batcher) Shutdown() {
	close(b.shutdownChan)
}

func (b *Batcher) flush(ctx context.Context) {
	b.mutex.Lock()
	if len(b.batch) == 0 {
		b.mutex.Unlock()
		return
	}

	// Create a copy of the batch to be processed
	batchToProcess := make([]models.CheckResult, len(b.batch))
	copy(batchToProcess, b.batch)
	b.batch = b.batch[:0] // Clear the original batch
	b.mutex.Unlock()

	log := b.log.With("batchSize", len(batchToProcess))
	log.Debug("Flushing batch to database")

	err := b.store.BulkInsertChecks(ctx, batchToProcess)
	if err != nil {
		log.Error("Failed to flush batch to database", "error", err)
		// Here you could add logic to retry or send to a dead-letter queue
	} else {
		log.Info("Successfully flushed batch to database")
	}
}