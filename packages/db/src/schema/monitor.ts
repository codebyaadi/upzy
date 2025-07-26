import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";
import { organizations, users } from "./auth";
import {
  authTypeEnum,
  httpMethodEnum,
  monitorTypeEnum,
} from "../enums/monitor";

export const monitors = pgTable("monitors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  createdById: text("created_by_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),

  // Basic configuration
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  url: text("url").notNull(),
  type: monitorTypeEnum("type").notNull(),

  // Timing configuration
  interval: integer("interval").notNull().default(60),
  requestTimeout: integer("request_timeout").notNull().default(30),
  retryCount: integer("retry_count").default(3).notNull(),

  // Status and control
  enabled: boolean("enabled").notNull().default(true),
  isPaused: boolean("is_paused").default(false).notNull(),

  // HTTP specific
  httpMethod: httpMethodEnum("http_method").default("GET"),
  requestBody: text("request_body"),
  requestHeaders: jsonb("request_headers").default([]).notNull(),
  expectedStatusCodes: integer("expected_status_codes")
    .array()
    .default([200])
    .notNull(),
  expectedResponseTime: integer("expected_response_time"),
  followRedirects: boolean("follow_redirects").default(true).notNull(),

  // SSL/TLS configuration
  verifySSL: boolean("verify_ssl").default(true).notNull(),
  sslCheckEnabled: boolean("ssl_check_enabled").default(false).notNull(),
  sslExpiryThreshold: integer("ssl_expiry_threshold").default(30).notNull(),

  // Authentication
  authType: authTypeEnum("auth_type").default("none").notNull(),
  authUsername: varchar("auth_username", { length: 255 }),
  authPassword: varchar("auth_password", { length: 255 }),
  authToken: varchar("auth_token", { length: 1000 }),

  // DNS specific
  dnsServer: varchar("dns_server", { length: 255 }),
  dnsRecordType: varchar("dns_record_type", { length: 10 }).default("A"),
  expectedIp: varchar("expected_ip", { length: 45 }),

  // Playwright specific
  playwrightScript: text("playwright_script"),

  // Heartbeat specific
  heartbeatGracePeriod: integer("heartbeat_grace_period").default(3600), // seconds

  // Regions
  regions: text("regions").array().notNull().default([]),

  // Metadata
  tags: jsonb("tags").default([]).notNull(),
  lastCheckAt: timestamp("last_check_at"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const monitorRegions = pgTable("monitor_regions", {
  id: text("id").primaryKey(),
  code: varchar("code", { length: 10 }).unique().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});
