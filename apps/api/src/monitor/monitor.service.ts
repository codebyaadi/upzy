import { Injectable } from "@nestjs/common";

import { CreateMonitorDto } from "./dto/create-monitor.dto.js";
import { UpdateMonitorDto } from "./dto/update-monitor.dto.js";

@Injectable()
export class MonitorService {
  create(createMonitorDto: CreateMonitorDto) {
    return "This action adds a new monitor";
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
