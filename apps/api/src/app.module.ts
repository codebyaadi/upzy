import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { envSchema } from './config/env.schema';
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          throw new Error(`Config validation error: ${parsed.error.message}`);
        }
        return parsed.data;
      },
    }),
    DatabaseModule,
    TestsModule,
    AuthModule,
    HealthModule,
    MonitorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
