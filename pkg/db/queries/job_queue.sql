-- name: GetMonitorJob :one
SELECT 
  id, 
  url, 
  type, 
  http_method, 
  request_timeout, 
  request_body, 
  request_headers, 
  expected_status_codes, 
  expected_response_time, 
  verify_ssl, 
  follow_redirects,
  -- TraceID is generated at runtime
  ''::text as trace_id
FROM monitors
WHERE id = $1;
