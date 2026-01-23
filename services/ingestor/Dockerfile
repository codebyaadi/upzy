# --- Build Stage ---
FROM golang:1.25-alpine AS builder

# Set a general working directory
WORKDIR /app

# 1. Copy the module files, maintaining their monorepo paths.
COPY services/ingestor/go.mod services/ingestor/go.sum ./services/ingestor/
COPY libs/db/go.mod ./libs/db/
COPY libs/logger/go.mod libs/logger/go.sum ./libs/logger/
COPY libs/datastore/go.mod libs/datastore/go.sum ./libs/datastore/

# 2. Change the working directory to the service we are building.
# This is the key step.
WORKDIR /app/services/ingestor

# 3. Download dependencies.
# Now, from this directory, the relative paths in 'replace' work correctly.
RUN go mod download

# 4. Copy the rest of the source code.
# The context is now the full monorepo.
WORKDIR /app
COPY . .

# 5. Build the application from the service's directory.
WORKDIR /app/services/ingestor
RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o /ingestor ./cmd/ingestor


# --- Final Stage ---
FROM alpine:latest

# Create a non-root user and group for security.
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the compiled binary from the builder stage into a standard binary location.
COPY --from=builder /ingestor /usr/local/bin/ingestor

# Switch to our non-root user.
USER appuser

# Set the command to run when the container starts.
CMD ["ingestor"]