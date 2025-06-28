import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { HealthService } from './health.service';
import { DatabaseService } from '../database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Handles the /health route to provide application health status.
   * Uses Fastify request and reply to manage the response manually.
   *
   * @param req FastifyRequest object
   * @param reply FastifyReply object
   */
  @Get()
  async health(
    @Req() req: FastifyRequest,
    @Res({ passthrough: false }) reply: FastifyReply,
  ) {
    const status = await this.healthService.getHealthStatus();

    const overallHealthy = this.healthService.isOverallHealthy(status);

    if (overallHealthy) {
      return reply.status(HttpStatus.OK).send(status);
    } else {
      return reply.status(HttpStatus.SERVICE_UNAVAILABLE).send(status);
    }
  }
}
