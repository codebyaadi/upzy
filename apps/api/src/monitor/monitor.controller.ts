import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { monitorInputSchema, type CreateMonitorDto } from '@upzy/validators';
import type { Session, User } from '@upzy/auth/types';
import { MonitorService } from './monitor.service';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod.pipe';
import {
  CurrentSession,
  CurrentUser,
} from 'src/common/decorators/user.decorator';

@Controller('monitor')
@UseGuards(AuthGuard)
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(monitorInputSchema))
    createMonitorDto: CreateMonitorDto,
    @CurrentUser() user: User,
    @CurrentSession() session: Session,
  ) {
    return this.monitorService.create(
      createMonitorDto,
      user.id,
      session.activeOrganizationId,
    );
  }

  @Get()
  findAll() {
    return this.monitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitorDto: UpdateMonitorDto) {
    return this.monitorService.update(+id, updateMonitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitorService.remove(+id);
  }
}
