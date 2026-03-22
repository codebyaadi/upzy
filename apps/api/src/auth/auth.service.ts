import { Injectable, OnModuleInit, InternalServerErrorException } from "@nestjs/common";
import { createAuth } from "@upzy/auth/server";
import type { Auth } from "@upzy/auth/types";

import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class AuthService implements OnModuleInit {
  private _auth: Auth | undefined;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    this._auth = createAuth(this.prisma);
  }

  get auth(): Auth {
    if (!this._auth) {
      throw new InternalServerErrorException(
        "AuthService used before initialization. Ensure onModuleInit has run.",
      );
    }
    return this._auth;
  }
}
