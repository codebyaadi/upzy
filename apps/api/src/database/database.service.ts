import { Injectable, Inject } from '@nestjs/common';
import type { Database } from '@upzy/db/drizzle';
import { DB_PROVIDER } from './database.provider';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DB_PROVIDER) private readonly db: Database) {}

  get database(): Database {
    return this.db;
  }

  // Health check method
  async isHealthy(): Promise<boolean> {
    try {
      await this.db.execute('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }
}
