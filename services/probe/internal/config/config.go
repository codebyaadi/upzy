package config

import (
	"github.com/spf13/viper"
	"strings"
)

type Config struct {
	Probe struct {
		Region      string `mapstructure:"region"`
		WorkerCount int    `mapstructure:"workerCount"`
	} `mapstructure:"probe"`
	Redis struct {
		URL string `mapstructure:"url"`
	} `mapstructure:"redis"`
}

func Load() (*Config, error) {
	vp := viper.New()
	var cfg Config

	vp.SetDefault("probe.region", "global")
	vp.SetDefault("probe.workerCount", 20)

	vp.BindEnv("redis.url", "REDIS_URL")

	vp.SetConfigName("config")
	vp.SetConfigType("yaml")
	vp.AddConfigPath(".")
	vp.AddConfigPath("/etc/upzy-probe/")
	if err := vp.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, err
		}
	}

	vp.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	vp.AutomaticEnv()

	if err := vp.Unmarshal(&cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}
