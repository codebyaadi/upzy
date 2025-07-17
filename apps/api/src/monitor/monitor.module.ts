import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';

@Module({
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}
