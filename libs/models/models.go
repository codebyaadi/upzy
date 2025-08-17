package models

import (
	"encoding/json"
	"time"
)

type MonitorJob struct {
	ID                   string          `json:"id"`
	TraceID              string          `json:"traceId,omitempty"` // For end-to-end tracing
	URL                  string          `json:"url"`
	Type                 string          `json:"type"`
	HTTPMethod           string          `json:"httpMethod"`
	RequestTimeout       int             `json:"requestTimeout"`
	RequestBody          string          `json:"requestBody,omitempty"`
	RequestHeaders       json.RawMessage `json:"requestHeaders,omitempty"`
	ExpectedStatusCodes  []int           `json:"expectedStatusCodes"`
	ExpectedResponseTime int             `json:"expectedResponseTime,omitempty"`
	VerifySSL            bool            `json:"verifySSL"`
	FollowRedirects      bool            `json:"followRedirects"`
}

type CheckResult struct {
	Timestamp      time.Time `json:"timestamp"`
	MonitorID      string    `json:"monitorId"`
	RequestID      string    `json:"requestId"`
	TraceID        string    `json:"traceId,omitempty"`
	ProbeRegion    string    `json:"probeRegion"`
	IsSuccess      bool      `json:"isSuccess"`
	StatusCode     int       `json:"statusCode,omitempty"`
	LatencyTotalMs int64     `json:"latencyTotalMs"`
	ErrorMessage   string    `json:"errorMessage,omitempty"`
}
