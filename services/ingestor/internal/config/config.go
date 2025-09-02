package config

import (
	"fmt"
	"strings"

	"github.com/spf13/viper"
)

// Config holds the application's configuration.
type Config struct {
	Redis struct {
		URL string `mapstructure:"url"`
	} `mapstructure:"redis"`
	Postgres struct {
		URL string `mapstructure:"url"`
	} `mapstructure:"postgres"`
	Ingestor struct {
		WorkerCount     int `mapstructure:"workercount"`
		BatchSize       int `mapstructure:"batchsize"`
		BatchTimeoutSec int `mapstructure:"batchtimeoutsec"`
	} `mapstructure:"ingestor"`
}

// Load reads configuration from a file and environment variables.
func Load() (*Config, error) {
	vp := viper.New()

	// 1. Set default values
	vp.SetDefault("ingestor.workercount", 10)
	vp.SetDefault("ingestor.batchsize", 500)
	vp.SetDefault("ingestor.batchtimeoutsec", 5)

	vp.BindEnv("redis.url", "REDIS_URL")
	vp.BindEnv("postgres.url", "POSTGRES_URL")

	// 2. Set config file settings (optional, but good practice)
	vp.SetConfigName("config") // e.g., config.yaml, config.json
	vp.SetConfigType("yaml")
	vp.AddConfigPath(".")        // Search in the current directory
	vp.AddConfigPath("/etc/app") // And in a standard config directory

	// Attempt to read the config file, but it's okay if it doesn't exist
	_ = vp.ReadInConfig()

	// 3. Set up environment variable handling
	vp.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	vp.AutomaticEnv() // Read in environment variables that match keys

	// 4. Unmarshal the config into the struct
	var cfg Config
	if err := vp.Unmarshal(&cfg); err != nil {
		return nil, fmt.Errorf("unable to decode into struct, %w", err)
	}

	// 5. Manually validate required fields
	if cfg.Redis.URL == "" {
		return nil, fmt.Errorf("required configuration not set: REDIS_URL")
	}
	if cfg.Postgres.URL == "" {
		return nil, fmt.Errorf("required configuration not set: POSTGRES_URL")
	}

	return &cfg, nil
}
