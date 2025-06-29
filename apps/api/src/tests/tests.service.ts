import { Injectable, Inject, Logger } from '@nestjs/common';
import { Database, schema } from '@upzy/db';
import { sendEmail } from '@upzy/email';

interface CreateTestData {
  id: string;
  name: string;
}

@Injectable()
export class TestsService {
  private readonly logger = new Logger(TestsService.name);

  constructor(@Inject('DATABASE') private readonly db: Database) {}

  async create(data: CreateTestData) {
    this.logger.log(`TestsService.create called with: ${JSON.stringify(data)}`);

    try {
      const now = new Date();

      this.logger.debug(`Inserting into database at: ${now.toISOString()}`);

      await sendEmail('test@mail.com', 'Test Welcome Mail', 'WelcomeEmail', {
        userName: 'hello',
        ctaUrl: 'http://lo.com',
      });

      const [result] = await this.db
        .insert(schema.tests)
        .values({
          id: data.id,
          name: data.name,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      this.logger.log(`Database insert successful: ${JSON.stringify(result)}`);

      return result;
    } catch (error: any) {
      this.logger.error(
        `Database error in TestsService.create: ${error.message}`,
        error.stack,
      );

      // Log additional database error details
      if (error.code) {
        this.logger.error(`Database error code: ${error.code}`);
      }
      if (error.detail) {
        this.logger.error(`Database error detail: ${error.detail}`);
      }

      throw error;
    }
  }

  // Helper method for debugging - get all tests
  async findAll() {
    this.logger.debug('Fetching all tests from database');

    try {
      const results = await this.db.select().from(schema.tests);

      this.logger.debug(`Found ${results.length} tests`);
      return results;
    } catch (error: any) {
      this.logger.error(`Error fetching tests: ${error.message}`);
      throw error;
    }
  }
}
