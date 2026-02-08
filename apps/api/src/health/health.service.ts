import { Injectable } from '@nestjs/common';
// import { sendEmail } from '@upzy/email';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class HealthService {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Performs all health checks and returns their status.
   * @returns An object containing the status of different components.
   */
  async getHealthStatus() {
    const databaseHealthy = await this.databaseService.isHealthy();

    return {
      server: 'UP', // The server is responding, so it's considered 'UP'
      database: databaseHealthy ? 'UP' : 'DOWN', // Database status based on the check
      timestamp: new Date().toISOString(), // Current timestamp for when the check was performed
    };
  }

  /**
   * Determines the overall health status based on individual component statuses.
   * @param status The status object returned by getHealthStatus.
   * @returns True if all critical components are healthy, false otherwise.
   */
  isOverallHealthy(status: { database: string; server: string }) {
    return status.database === 'UP';
  }
}
