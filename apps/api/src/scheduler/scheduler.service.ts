import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  and,
  Database,
  eq,
  inArray,
  isNull,
  lte,
  monitors,
  or,
  RedisClientType,
} from '@upzy/db';
import { sql } from '@upzy/db';
import { generateUUIDv7 } from '@upzy/utils';
import { DB_PROVIDER, REDIS_PROVIDER } from 'src/database/database.provider';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @Inject(DB_PROVIDER) private readonly db: Database,
    @Inject(REDIS_PROVIDER) private readonly redis: RedisClientType,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async scheduleMonitor() {
    this.logger.debug('Checking for monitors due for a run...');

    try {
      const now = new Date();
      const dueMonitors = await this.db.query.monitors.findMany({
        where: and(
          eq(monitors.enabled, true),
          eq(monitors.isPaused, false),
          or(
            isNull(monitors.lastCheckAt),
            lte(
              monitors.lastCheckAt,
              sql`NOW() - (monitors.interval * interval '1 second')`,
            ),
          ),
        ),
      });

      if (dueMonitors.length === 0) {
        this.logger.debug('No monitors are due.');
        return;
      }

      this.logger.log(`Found ${dueMonitors.length} monitors to schedule.`);

      const monitorIds = dueMonitors.map((m) => m.id);
      await this.db
        .update(monitors)
        .set({ lastCheckAt: now })
        .where(inArray(monitors.id, monitorIds));

      const multi = this.redis.multi();
      let jobsPublished = 0;

      for (const monitor of dueMonitors) {
        const traceId = generateUUIDv7();

        this.logger.log(
          `Scheduling run for monitor ${monitor.id} with traceId: ${traceId}`,
        );

        const targetRegions =
          monitor.regions && monitor.regions.length > 0
            ? monitor.regions
            : ['global'];

        for (const region of targetRegions) {
          const job = {
            ...monitor,
            traceId: traceId,
          };

          const jobPayload = JSON.stringify(job);
          const streamName = `jobs:checks:${region}`;

          multi.xAdd(streamName, '*', { payload: jobPayload });
          jobsPublished++;
        }
      }

      await multi.exec();
      this.logger.log(
        `Successfully published ${jobsPublished} jobs across all regions.`,
      );
    } catch (error) {
      this.logger.error('Error during monitor scheduling:', error);
    }
  }
}
