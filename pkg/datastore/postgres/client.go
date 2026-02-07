package postgres

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

// NewConnectionPool creates and returns a new PostgreSQL connection pool.
// It takes the database connection string and the number of retries as arguments.
func NewConnectionPool(ctx context.Context, dsn string, maxRetries int) (*pgxpool.Pool, error) {
	var pool *pgxpool.Pool
	var err error

	for i := 0; i < maxRetries; i++ {
		pool, err = pgxpool.New(ctx, dsn)
		if err == nil {
			// Try to acquire a connection to verify connectivity.
			if conn, connErr := pool.Acquire(ctx); connErr == nil {
				conn.Release()
				return pool, nil // Success
			}
		}
		time.Sleep(2 * time.Second) // Wait before retrying
	}

	return nil, fmt.Errorf("could not connect to postgres after %d attempts: %w", maxRetries, err)
}
