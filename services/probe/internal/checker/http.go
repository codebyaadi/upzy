package checker

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"slices"
	"strings"
	"time"

	fhttp "github.com/bogdanfinn/fhttp"
	tls_client "github.com/bogdanfinn/tls-client"
	"github.com/bogdanfinn/tls-client/profiles"
	"github.com/codebyaadi/upzy/libs/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func isRetryableError(err error) bool {
	if err == nil {
		return false
	}
	if errors.Is(err, io.EOF) || errors.Is(err, context.DeadlineExceeded) {
		return true
	}
	errStr := err.Error()
	if strings.Contains(errStr, "connection reset by peer") ||
		strings.Contains(errStr, "broken pipe") ||
		strings.Contains(errStr, "timeout") {
		return true
	}
	return false
}

func ExecuteHTTPCheck(job db.GetMonitorJobRow, region string) db.Check {
	startTime := time.Now()
	requestID := uuid.New().String()

	result := db.Check{
		Timestamp:   pgtype.Timestamptz{Time: startTime.UTC(), Valid: true},
		MonitorID:   job.ID,
		RequestID:   requestID,
		TraceID:     job.TraceID,
		ProbeRegion: region,
		IsSuccess:   false,
	}

	jar := tls_client.NewCookieJar()
	options := []tls_client.HttpClientOption{
		tls_client.WithTimeoutSeconds(int(job.RequestTimeout)),
		tls_client.WithClientProfile(profiles.Chrome_120),
		tls_client.WithCookieJar(jar),
	}
	if !job.FollowRedirects {
		options = append(options, tls_client.WithNotFollowRedirects())
	}

	client, err := tls_client.NewHttpClient(tls_client.NewNoopLogger(), options...)
	if err != nil {
		result.ErrorMessage = pgtype.Text{String: fmt.Sprintf("Failed to create TLS client: %v", err), Valid: true}
		return result
	}

	proxyURL := os.Getenv("PROXY_URL")
	if proxyURL != "" {
		client.SetProxy(proxyURL)
	}

	const maxRetries = 3
	var lastErr error

	for attempt := 1; attempt <= maxRetries; attempt++ {
		// Use HTTPMethod directly because it's a string type in generated struct if we mapped it,
		// but in DB it's NullHttpMethod. Wait, job_queue.sql says:
		// http_method,
		// And generated struct has: HttpMethod NullHttpMethod.
		// We need to access .HttpMethod and maybe string() it?
		// Actually NullHttpMethod is struct { HttpMethod HttpMethod; Valid bool }.
		// And HttpMethod is string-like enum.

		method := "GET"
		if job.HttpMethod.Valid {
			method = string(job.HttpMethod.HttpMethod)
		}

		body := ""
		if job.RequestBody.Valid {
			body = job.RequestBody.String
		}

		req, err := fhttp.NewRequest(method, job.Url, strings.NewReader(body))
		if err != nil {
			result.ErrorMessage = pgtype.Text{String: fmt.Sprintf("Failed to create request: %v", err), Valid: true}
			return result
		}

		req.Header = fhttp.Header{
			"accept":             {"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"},
			"accept-encoding":    {"gzip, deflate, br"},
			"accept-language":    {"en-US,en;q=0.9"},
			"sec-ch-ua":          {"\"Google Chrome\";v=\"120\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"120\""},
			"sec-ch-ua-mobile":   {"?0"},
			"sec-ch-ua-platform": {"\"Windows\""},
			"user-agent":         {"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"},
			"X-Upzy-Request-ID":  {requestID},
		}

		if len(job.RequestHeaders) > 0 {
			var customHeaders map[string]string
			if err := json.Unmarshal(job.RequestHeaders, &customHeaders); err == nil {
				for key, value := range customHeaders {
					req.Header.Set(key, value)
				}
			}
		}

		resp, err := client.Do(req)
		if err != nil {
			lastErr = err
			if isRetryableError(err) && attempt < maxRetries {
				time.Sleep(time.Duration(attempt) * time.Second)
				continue
			}
			break
		}

		_, _ = io.Copy(io.Discard, resp.Body)
		resp.Body.Close()

		lastErr = nil
		result.StatusCode = pgtype.Int4{Int32: int32(resp.StatusCode), Valid: true}
		if slices.Contains(job.ExpectedStatusCodes, int32(resp.StatusCode)) {
			result.IsSuccess = true
		} else {
			result.ErrorMessage = pgtype.Text{String: fmt.Sprintf("Unexpected status code: %d", resp.StatusCode), Valid: true}
		}
		break
	}

	if lastErr != nil {
		result.ErrorMessage = pgtype.Text{String: fmt.Sprintf("Request failed after %d attempts: %v", maxRetries, lastErr), Valid: true}
	}

	latencyMs := time.Since(startTime).Milliseconds()
	if result.IsSuccess && job.ExpectedResponseTime.Valid && latencyMs > int64(job.ExpectedResponseTime.Int32) {
		result.IsSuccess = false
		result.ErrorMessage = pgtype.Text{String: fmt.Sprintf("Response time (%dms) exceeded threshold (%dms)", latencyMs, job.ExpectedResponseTime.Int32), Valid: true}
	}

	result.LatencyTotalMs = int32(latencyMs)
	return result
}
