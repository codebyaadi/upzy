// Export database clients (e.g., db, redis)
export * from "./drizzle";

// Export all schemas and also a named 'schema' object for convenience
export * from "./schema";
export * as schema from "./schema";

// Export common Drizzle operators
export {
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  and,
  or,
  inArray,
  isNull,
  isNotNull,
  sql,
} from "drizzle-orm";

// Export useful Drizzle types
export type { NodePgDatabase } from "drizzle-orm/node-postgres";
