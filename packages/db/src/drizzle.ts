import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"; // Your Drizzle schema definitions

export type Database = NodePgDatabase<typeof schema>;

const databaseInstanceCache = new Map<string, Database>();
const poolInstanceCache = new Map<string, Pool>();

/**
 * Creates and memoizes a Drizzle database instance for a given connection string.
 * This ensures that a single Pool and Drizzle instance is reused for the same connection string,
 * preventing connection leaks and optimizing resource usage.
 *
 * @param connectionString The PostgreSQL connection string.
 * @returns A Drizzle database instance.
 */
export function createDatabase(connectionString: string): Database {
  if (databaseInstanceCache.has(connectionString)) {
    return databaseInstanceCache.get(connectionString)!;
  }

  let pool = poolInstanceCache.get(connectionString);
  if (!pool) {
    pool = new Pool({
      connectionString,
      // Optional: Add more pool config here, e.g., max, idleTimeoutMillis
      // max: 20,
      // idleTimeoutMillis: 30000,
    });
    poolInstanceCache.set(connectionString, pool);

    pool.on("error", (err) => {
      console.error(
        "Unexpected error on idle client in pool for:",
        connectionString,
        err,
      );
      // Depending on error, you might want to clear cache for this connectionString
      // databaseInstanceCache.delete(connectionString);
      // poolInstanceCache.delete(connectionString);
    });
  }

  const db = drizzle(pool, { schema });
  databaseInstanceCache.set(connectionString, db);
  return db;
}

/**
 * Gets the default database instance from `process.env.DATABASE_URL`.
 * This is convenient for environments where the URL is globally available
 * and you want a single, pre-configured instance.
 * It leverages `createDatabase` for memoization.
 * Throws an error if DATABASE_URL is not set.
 */
export function getDefaultDb(): Database {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set.");
  }
  return createDatabase(process.env.DATABASE_URL);
}

/**
 * Closes all cached database pools gracefully.
 * Essential for proper application shutdown in long-running processes (e.g., NestJS).
 */
export async function closeAllDatabaseConnections(): Promise<void> {
  console.log("Attempting to close all database connections...");
  for (const [connectionString, pool] of poolInstanceCache.entries()) {
    try {
      await pool.end();
      console.log(`Pool for ${connectionString} closed successfully.`);
    } catch (error) {
      console.error(`Error closing pool for ${connectionString}:`, error);
    } finally {
      // Always remove from cache regardless of success/failure to prevent stale references
      poolInstanceCache.delete(connectionString);
      databaseInstanceCache.delete(connectionString);
    }
  }
  console.log("All database connections processed.");
}
