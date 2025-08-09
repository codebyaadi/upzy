import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMonitorDto } from '@upzy/validators';
import { Database, monitors } from '@upzy/db';
import { generateSlug } from '@upzy/utils';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { DB_PROVIDER } from '../database/database.provider';

@Injectable()
export class MonitorService {
  constructor(@Inject(DB_PROVIDER) private readonly db: Database) {}

  async create(
    createMonitorDto: CreateMonitorDto,
    userId: string,
    organizationId?: string | null,
  ): Promise<{ message: string; success: boolean }> {
    if (!organizationId || !userId) {
      throw new HttpException(
        'User must be logged in and have an active organization.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const monitorSlug = await generateSlug(createMonitorDto.name);

      await this.db.insert(monitors).values({
        ...createMonitorDto,
        slug: monitorSlug,
        createdById: userId,
        organizationId: organizationId,
      });

      return { message: 'Monitor created successfully!', success: true };
    } catch (error) {
      console.error('Database Error: Failed to create monitor.', error);
      throw new HttpException(
        'Failed to create monitor due to a server error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all monitor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monitor`;
  }

  update(id: number, updateMonitorDto: UpdateMonitorDto) {
    return `This action updates a #${id} monitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitor`;
  }
}
