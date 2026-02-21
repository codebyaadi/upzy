import { Injectable } from "@nestjs/common";
import { PrismaClient, getPrismaOptions } from "@upzy/db";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super(getPrismaOptions());
  }
}
