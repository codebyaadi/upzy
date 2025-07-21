import * as z from "zod";

export const MonitorTypeEnum = z.enum([
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

export const HttpMethodEnum = z.enum([
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
]);

export const AuthTypeEnum = z.enum([
  "none",
  "basic",
  "bearer",
  "api_key",
  "digest",
]);
