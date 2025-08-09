import * as z from "zod";
import {
  AuthTypeEnum,
  HttpMethodEnum,
  MonitorTypeEnum,
} from "../enums/monitor";

// Input schema for the form (with optional fields that have defaults)
export const monitorInputSchema = z.object({
  // Basic fields - required
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Please enter a valid URL"),
  type: MonitorTypeEnum,
  interval: z.number().min(1, "Interval must be at least 1 second"),

  // Fields with defaults - optional in input
  requestTimeout: z.number().optional(),
  retryCount: z.number().int().min(0).optional(),
  enabled: z.boolean().optional(),
  isPaused: z.boolean().optional(),
  httpMethod: HttpMethodEnum.optional(),
  expectedStatusCodes: z.array(z.number().int()).optional(),
  followRedirects: z.boolean().optional(),
  verifySSL: z.boolean().optional(),
  sslCheckEnabled: z.boolean().optional(),
  sslExpiryThreshold: z.number().int().optional(),
  authType: AuthTypeEnum.optional(),
  dnsRecordType: z.string().max(10).optional(),
  heartbeatGracePeriod: z.number().int().optional(),
  playwrightScript: z.string().optional(),
  regions: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),

  // Optional fields
  requestBody: z.string().optional(),
  requestHeaders: z.string().optional(),
  expectedResponseTime: z.number().int().optional(),
  authUsername: z.string().max(255).optional(),
  authPassword: z.string().max(255).optional(),
  authToken: z.string().max(1000).optional(),
  dnsServer: z.string().max(255).optional(),
  expectedIp: z.string().max(45).optional(),
});

// Output schema with defaults applied (for validation and API)
export const monitorSchema = monitorInputSchema.transform((data) => ({
  ...data,
  requestTimeout: data.requestTimeout ?? 30,
  retryCount: data.retryCount ?? 3,
  enabled: data.enabled ?? true,
  isPaused: data.isPaused ?? false,
  httpMethod: data.httpMethod ?? "GET",
  expectedStatusCodes: data.expectedStatusCodes ?? [200],
  followRedirects: data.followRedirects ?? true,
  verifySSL: data.verifySSL ?? true,
  sslCheckEnabled: data.sslCheckEnabled ?? false,
  sslExpiryThreshold: data.sslExpiryThreshold ?? 30,
  authType: data.authType ?? "none",
  dnsRecordType: data.dnsRecordType ?? "A",
  heartbeatGracePeriod: data.heartbeatGracePeriod ?? 3600,
  playwrightScript: data.playwrightScript ?? "",
  regions: data.regions ?? [],
  tags: data.tags ?? [],
}));

export type CreateMonitorDto = z.infer<typeof monitorInputSchema>;
