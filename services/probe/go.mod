module github.com/codebyaadi/upzy/services/probe

go 1.24.5

require (
	github.com/bogdanfinn/fhttp v0.6.0
	github.com/bogdanfinn/tls-client v1.11.0
	github.com/codebyaadi/upzy/libs/datastore v0.0.0-00010101000000-000000000000
	github.com/codebyaadi/upzy/libs/logger v0.0.0-20250810175205-1b6bb75f93f6
	github.com/codebyaadi/upzy/libs/models v0.0.0-00010101000000-000000000000
	github.com/google/uuid v1.6.0
	github.com/redis/go-redis/v9 v9.12.1
	github.com/spf13/viper v1.20.1
)

require (
	github.com/Dharmey747/quic-go-utls v1.0.3-utls // indirect
	github.com/andybalholm/brotli v1.1.1 // indirect
	github.com/bogdanfinn/utls v1.7.3-barnius // indirect
	github.com/cespare/xxhash/v2 v2.3.0 // indirect
	github.com/cloudflare/circl v1.5.0 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/fatih/color v1.18.0 // indirect
	github.com/fsnotify/fsnotify v1.8.0 // indirect
	github.com/go-viper/mapstructure/v2 v2.2.1 // indirect
	github.com/google/go-cmp v0.7.0 // indirect
	github.com/klauspost/compress v1.17.11 // indirect
	github.com/mattn/go-colorable v0.1.13 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/pelletier/go-toml/v2 v2.2.3 // indirect
	github.com/quic-go/qpack v0.5.1 // indirect
	github.com/sagikazarmark/locafero v0.7.0 // indirect
	github.com/sourcegraph/conc v0.3.0 // indirect
	github.com/spf13/afero v1.12.0 // indirect
	github.com/spf13/cast v1.7.1 // indirect
	github.com/spf13/pflag v1.0.6 // indirect
	github.com/subosito/gotenv v1.6.0 // indirect
	github.com/tam7t/hpkp v0.0.0-20160821193359-2b70b4024ed5 // indirect
	go.uber.org/atomic v1.9.0 // indirect
	go.uber.org/mock v0.5.0 // indirect
	go.uber.org/multierr v1.9.0 // indirect
	golang.org/x/crypto v0.37.0 // indirect
	golang.org/x/mod v0.18.0 // indirect
	golang.org/x/net v0.38.0 // indirect
	golang.org/x/sync v0.14.0 // indirect
	golang.org/x/sys v0.33.0 // indirect
	golang.org/x/text v0.25.0 // indirect
	golang.org/x/tools v0.22.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

replace github.com/codebyaadi/upzy/libs/logger => ../../libs/logger

replace github.com/codebyaadi/upzy/libs/models => ../../libs/models

replace github.com/codebyaadi/upzy/libs/datastore => ../../libs/datastore
