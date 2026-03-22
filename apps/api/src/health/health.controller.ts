import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from "@nestjs/terminus";
import { Public } from "src/auth/public.decorator.js";

import { PrismaService } from "../prisma/prisma.service.js";

@Public()
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaIndicator: PrismaHealthIndicator,
    private prismaService: PrismaService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    await this.prismaService.$queryRaw`SELECT 1`; // Example query
    return this.health.check([
      () => this.prismaIndicator.pingCheck("database", this.prismaService),
      () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
      () => this.memory.checkRSS("memory_rss", 150 * 1024 * 1024),
    ]);
  }
}
