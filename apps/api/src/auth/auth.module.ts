import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
