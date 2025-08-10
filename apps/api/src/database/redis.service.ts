import { Injectable, Inject } from '@nestjs/common';
import { REDIS_PROVIDER } from './database.provider';
import { RedisClientType } from '@upzy/db';

@Injectable()
export class RedisService {
  constructor(
    @Inject(REDIS_PROVIDER) private readonly redis: RedisClientType,
  ) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<string | null> {
    return this.redis.set(key, value, {
      EX: ttlSeconds,
    });
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
