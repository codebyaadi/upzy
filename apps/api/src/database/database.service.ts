import { Injectable, Inject } from '@nestjs/common';
import { Database } from '@upzy/db';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE') private readonly db: Database) {}

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
