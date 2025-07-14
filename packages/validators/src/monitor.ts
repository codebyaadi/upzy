import * as z from "zod";

export const monitorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  url: z.string().url("Please enter a valid URL"),
  interval: z.number().min(1, "Interval must be at least 1 second"),
  enabled: z.boolean(),
  verifySSL: z.boolean(),
  regions: z.array(z.string()).min(1, "At least one region must be selected"),
  httpMethod: z.enum([
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
  ]),
  requestTimeout: z.number().min(1, "Timeout must be at least 1 second"),
  requestBody: z.string().optional(),
  requestHeaders: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    }, "Invalid JSON format for headers"),
});

export type CreateMonitorDto = z.infer<typeof monitorSchema>;
