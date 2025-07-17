import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitorDto } from './create-monitor.dto';

export class UpdateMonitorDto extends PartialType(CreateMonitorDto) {}
