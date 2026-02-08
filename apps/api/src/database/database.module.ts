import {
  Module,
  Global,
  OnModuleDestroy,
  Inject,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { EnvType } from '../config/env.schema';
import { DB_PROVIDER, REDIS_PROVIDER } from './database.provider';
import { RedisService } from './redis.service';
import { closeAllDatabaseConnections, createDatabase } from '@upzy/db/drizzle';
import { createRedisClient, type RedisClientType } from '@upzy/db/redis';

const logger = new Logger('DatabaseModule');

@Global()
@Module({
  providers: [
    {
      provide: DB_PROVIDER,
      useFactory: (configService: ConfigService<EnvType>) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          logger.error('DATABASE_URL is not defined in NestJS configuration.');
          throw new Error(
            'DATABASE_URL is not defined in NestJS configuration.',
          );
        }
        return createDatabase(databaseUrl);
      },
      inject: [ConfigService],
    },
    DatabaseService,
    {
      provide: REDIS_PROVIDER,
      useFactory: async (configService: ConfigService<EnvType>) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        if (!redisUrl) {
          logger.error('REDIS_URL is not defined in NestJS configuration.');
          throw new Error('REDIS_URL is not defined in NestJS configuration.');
        }

        const redisClient = createRedisClient(redisUrl);

        logger.log('Connecting to Redis...');
        await redisClient.connect();
        logger.log('Redis connected successfully.');

        return redisClient;
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [DB_PROVIDER, DatabaseService, REDIS_PROVIDER, RedisService],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_PROVIDER) private readonly redis: RedisClientType,
  ) {}

  // This lifecycle hook is crucial for graceful shutdown of long-running processes
  async onModuleDestroy() {
    logger.log('Closing Redis connection...');
    this.redis.destroy();
    logger.log('Redis connection closed.');
    await closeAllDatabaseConnections();
  }
}
