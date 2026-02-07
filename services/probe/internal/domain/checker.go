package domain

import (
	"context"

	"github.com/codebyaadi/upzy/pkg/db"
)

type Checker interface {
	Run(ctx context.Context, job db.GetMonitorJobRow) db.Check
}
