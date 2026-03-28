import { Module } from "@nestjs/common";

import { MonitorController } from "./monitor.controller.js";
import { MonitorService } from "./monitor.service.js";

@Module({
  controllers: [MonitorController],
  providers: [MonitorService],
})
export class MonitorModule {}
