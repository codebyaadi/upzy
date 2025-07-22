package logger

import (
	"log/slog"
	"os"
)

var Logger *slog.Logger

func Init(level string) {
	var logLevel slog.Level
	switch level {
	case "debug":
		logLevel = slog.LevelDebug
	case "info":
		logLevel = slog.LevelInfo
	case "warn":
		logLevel = slog.LevelWarn
	case "error":
		logLevel = slog.LevelError
	default:
		logLevel = slog.LevelInfo
	}

	Logger = slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: logLevel,
	}))
}

func Info(msg string, args ...any) {
	Logger.Info(msg, args...)
}

func Error(msg string, args ...any) {
	Logger.Error(msg, args...)
}

func Debug(msg string, args ...any) {
	Logger.Debug(msg, args...)
}

func Warn(msg string, args ...any) {
	Logger.Warn(msg, args...)
}
