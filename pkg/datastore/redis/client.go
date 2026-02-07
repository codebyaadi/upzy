package redis

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

// NewClient creates and returns a new Redis client with connection retry logic.
// It takes the Redis URL and the number of retries as arguments.
func NewClient(ctx context.Context, url string, maxRetries int) (*redis.Client, error) {
	opts, err := redis.ParseURL(url)
	if err != nil {
		return nil, fmt.Errorf("could not parse redis url: %w", err)
	}

	client := redis.NewClient(opts)

	var connectionErr error
	for i := 0; i < maxRetries; i++ {
		if _, err := client.Ping(ctx).Result(); err == nil {
			return client, nil // Success
		}
		time.Sleep(2 * time.Second) // Wait before retrying
	}

	return nil, fmt.Errorf("could not connect to redis after %d attempts: %w", maxRetries, connectionErr)
}
