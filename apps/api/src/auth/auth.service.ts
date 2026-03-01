import { Injectable, OnModuleInit } from "@nestjs/common";
import { createAuth } from "@upzy/auth/server";
import { Auth } from "@upzy/auth/types";

import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class AuthService implements OnModuleInit {
  public auth: Auth;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    // ✅ Auth only initializes once the PrismaService is fully ready
    this.auth = createAuth(this.prisma);
  }
}
