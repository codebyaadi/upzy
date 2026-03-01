import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@upzy/db";
import pg from "pg";

@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Uses a manual pg Pool and PrismaPg adapter to ensure the database connection
   * only initializes within the NestJS lifecycle once environment variables are ready.
   */
  constructor() {
    const url = process.env.DATABASE_URL;
    const pool = new pg.Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }
}
