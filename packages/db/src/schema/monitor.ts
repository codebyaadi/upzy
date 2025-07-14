import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { organizations, users } from "./auth";

export const monitors = pgTable("monitors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  interval: integer("interval").notNull().default(60),
  enabled: boolean("enabled").notNull().default(true),
  verifySSL: boolean("verify_ssl").default(true).notNull(),
  regions: text("regions").array().notNull().default([]),
  httpMethod: text("http_method").default("get"),
  requestTimeout: integer("request_timeout").default(30),
  requestBody: text("request_body"),
  requestHeaders: jsonb("request_headers").default([]).notNull(),
  createdById: text("created_by_id")
    .notNull()
    .references(() => users.id, { onDelete: "set null" }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
