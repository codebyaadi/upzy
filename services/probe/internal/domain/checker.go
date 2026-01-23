package domain

import (
	"context"

	"github.com/codebyaadi/upzy/libs/db"
)

type Checker interface {
	Run(ctx context.Context, job db.GetMonitorJobRow) db.Check
}