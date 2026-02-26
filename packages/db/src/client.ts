import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { PrismaClient } from "../generated/prisma/client";

/**
 * Factory to create a PrismaClient with the PostgreSQL driver adapter.
 * @param databaseUrl - Connection string (defaults to process.env.DATABASE_URL).
 * @returns Configured PrismaClient.
 * @throws Error if no connection string is found.
 */
export const createPrismaClient = (databaseUrl?: string) => {
  const url = databaseUrl || process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is missing. Initialization aborted.");
  }

  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
};
