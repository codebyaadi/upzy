import { Test, TestingModule } from "@nestjs/testing";

import { MonitorController } from "./monitor.controller.js";
import { MonitorService } from "./monitor.service.js";

describe("MonitorController", () => {
  let controller: MonitorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonitorController],
      providers: [MonitorService],
    }).compile();

    controller = module.get<MonitorController>(MonitorController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
