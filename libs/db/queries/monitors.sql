-- name: ListActiveMonitors :many
SELECT * FROM monitors
WHERE enabled = true AND is_paused = false;
