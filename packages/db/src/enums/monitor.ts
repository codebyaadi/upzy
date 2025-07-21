import { pgEnum } from "drizzle-orm/pg-core";

export const monitorTypeEnum = pgEnum("monitor_type", [
  "http",
  "https",
  "ping",
  "tcp",
  "dns",
  "ssl",
  "smtp",
  "pop3",
  "imap",
  "playwright",
  "heartbeat",
]);

export const httpMethodEnum = pgEnum("http_method", [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
]);

export const authTypeEnum = pgEnum("auth_type", [
  "none",
  "basic",
  "bearer",
  "api_key",
  "digest",
]);
