package store

import (
	"context"

	"github.com/codebyaadi/upzy/libs/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Store struct {
	pool *pgxpool.Pool
}

func New(pool *pgxpool.Pool) *Store {
	return &Store{pool: pool}
}

// BulkInsertChecks inserts multiple check results using the high-performance COPY protocol.
func (s *Store) BulkInsertChecks(ctx context.Context, results []models.CheckResult) error {
	// Define the columns in the order we will provide them.
	// This must match the order of fields in the CopyFromSource.
	columns := []string{
		"timestamp",
		"monitor_id",
		"trace_id",
		"request_id",
		"probe_region",
		"is_success",
		"status_code",
		"latency_total_ms",
		"error_message",
		"timings",
	}

	// pgx.CopyFromSource is an interface that pgx uses to stream data.
	// We provide an implementation of this interface by wrapping our slice of results.
	source := &checkResultSource{results: results}

	_, err := s.pool.CopyFrom(ctx, pgx.Identifier{"checks"}, columns, source)
	return err
}

// checkResultSource is a helper struct to adapt our []CheckResult slice
// to the pgx.CopyFromSource interface.
type checkResultSource struct {
	results []models.CheckResult
	idx     int
}

// Next returns true if there are more rows to process.
func (s *checkResultSource) Next() bool {
	return s.idx < len(s.results)
}

// Values returns the values for the current row.
func (s *checkResultSource) Values() ([]interface{}, error) {
	r := s.results[s.idx]
	s.idx++

	// The order of values must exactly match the 'columns' slice in BulkInsertChecks.
	return []interface{}{
		r.Timestamp,
		r.MonitorID,
		r.TraceID,
		r.RequestID,
		r.ProbeRegion,
		r.IsSuccess,
		r.StatusCode,
		r.LatencyTotalMs,
		r.ErrorMessage,
		r.Timings,
	}, nil
}

// Err returns any error that occurred during processing.
func (s *checkResultSource) Err() error {
	return nil
}