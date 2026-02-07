# --- Build Stage ---
FROM golang:1.25-alpine AS builder

# Set a general working directory
WORKDIR /app

# 1. Copy the module files, maintaining their monorepo paths.
COPY services/probe/go.mod services/probe/go.sum ./services/probe/
COPY pkg/db/go.mod ./pkg/db/
COPY pkg/logger/go.mod pkg/logger/go.sum ./pkg/logger/
COPY pkg/datastore/go.mod pkg/datastore/go.sum ./pkg/datastore/

# 2. Change the working directory to the service we are building.
# This is the key step.
WORKDIR /app/services/probe

# 3. Download dependencies.
# Now, from this directory, the relative paths in 'replace' work correctly.
RUN go mod download

# 4. Copy the rest of the source code.
# The context is now the full monorepo.
WORKDIR /app
COPY . .

# 5. Build the application from the service's directory.
WORKDIR /app/services/probe
RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o /probe ./cmd/probe


# --- Final Stage ---
FROM alpine:latest

# Create a non-root user and group for security.
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the compiled binary from the builder stage into a standard binary location.
COPY --from=builder /probe /usr/local/bin/probe

# Switch to our non-root user.
USER appuser

# Set the command to run when the container starts.
CMD ["probe"]