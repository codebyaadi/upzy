import {
  boolean,
  index, // 👈 Import the index function
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { monitors } from "./monitor";

/**
 * Note: After table creation run this to make it hypertable - `SELECT create_hypertable('checks', 'timestamp');`
 */
export const checks = pgTable(
  "checks",
  {
    timestamp: timestamp("timestamp", { withTimezone: true })
      .notNull()
      .defaultNow(),

    monitorId: text("monitor_id")
      .notNull()
      .references(() => monitors.id, { onDelete: "cascade" }),

    traceId: text("trace_id").notNull(),
    requestId: text("request_id").notNull(),
    probeRegion: varchar("probe_region", { length: 50 }).notNull(),

    isSuccess: boolean("is_success").notNull(),
    statusCode: integer("status_code"),
    latencyTotalMs: integer("latency_total_ms").notNull(),
    errorMessage: text("error_message"),

    timings: jsonb("timings").$type<{
      dnsLookup?: number;
      tcpConnection?: number;
      tlsHandshake?: number;
      timeToFirstByte?: number;
    }>(),
  },
  (t) => [
    // ✅ Index for quickly looking up all checks belonging to a single trace
    index("checks_trace_id_idx").on(t.traceId),

    // ✅ Composite index for the most common query: fetching recent checks for a specific monitor
    index("checks_monitor_id_timestamp_idx").on(t.monitorId, t.timestamp),
  ],
);

export const checksRelations = relations(checks, ({ one }) => ({
  monitor: one(monitors, {
    fields: [checks.monitorId],
    references: [monitors.id],
  }),
}));
