package logger

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"os"
	"strings"

	"github.com/fatih/color"
)

type Logger struct {
	*slog.Logger
}

const (
	contextKey = "context"
)

type PrettyHandler struct {
	slog.Handler
	writer      io.Writer
	serviceName string
	pid         int
}

type HandlerOptions struct {
	SlogOpts    slog.HandlerOptions
	ServiceName string
}

func New(serviceName string) *Logger {
	opts := HandlerOptions{
		ServiceName: serviceName,
		SlogOpts: slog.HandlerOptions{
			Level: slog.LevelDebug,
		},
	}

	color.NoColor = false
	handler := NewPrettyHandler(os.Stdout, opts)
	slogLogger := slog.New(handler)
	return &Logger{slogLogger}
}

func (l *Logger) Fatal(msg string, args ...any) {
	l.Error(msg, args...)
	os.Exit(1)
}

func NewPrettyHandler(out io.Writer, opts HandlerOptions) *PrettyHandler {
	return &PrettyHandler{
		writer:      out,
		serviceName: opts.ServiceName,
		pid:         os.Getpid(),
		Handler:     slog.NewTextHandler(out, &opts.SlogOpts),
	}
}

func (h *PrettyHandler) Handle(_ context.Context, r slog.Record) error {
	green := color.New(color.FgGreen).SprintFunc()
	yellow := color.New(color.FgYellow).SprintFunc()
	cyan := color.New(color.FgCyan).SprintFunc()
	white := color.New(color.FgWhite).SprintFunc()

	levelStr := r.Level.String() + ":"
	switch r.Level {
	case slog.LevelDebug:
		levelStr = color.MagentaString(levelStr)
	case slog.LevelInfo:
		levelStr = color.GreenString(levelStr)
	case slog.LevelWarn:
		levelStr = color.YellowString(levelStr)
	case slog.LevelError:
		levelStr = color.RedString(levelStr)
	}

	var logContext string
	var attrs strings.Builder

	r.Attrs(func(attr slog.Attr) bool {
		if attr.Key == contextKey {
			logContext = attr.Value.String()
			return true
		}
		attrs.WriteString(fmt.Sprintf(" %s=%s", yellow(attr.Key), white(attr.Value.String())))
		return true
	})

	if logContext == "" {
		logContext = "Application"
	}

	timestamp := r.Time.Format("01/02/2006, 03:04:05 PM")

	logString := fmt.Sprintf("%s %s - %s   %-18s %s %s%s\n",
		green(fmt.Sprintf("[%s]", h.serviceName)),
		yellow(h.pid),
		timestamp,
		levelStr,
		cyan(fmt.Sprintf("[%s]", logContext)),
		r.Message,
		attrs.String(),
	)

	_, err := h.writer.Write([]byte(logString))
	return err
}
