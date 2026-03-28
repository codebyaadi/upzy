import z from "zod";

export const MonitorType = z.enum(["http", "tcp", "dns", "ssl", "synthetic"]);

const BaseMonitorSchema = {
  workspaceId: z.uuid(),
  name: z
    .string()
    .trim()
    .min(1, { error: "Name is required" })
    .max(100, { error: "Name must be at most 100 characters" }),
  interval: z.coerce
    .number()
    .int({ error: "Interval must be an integer" })
    .positive({ error: "Interval must be greater than 0" })
    .refine((v) => [60, 300, 600, 1800, 3600].includes(v), {
      error: "Interval must be one of 60, 300, 600, 1800, 3600",
    }),
  active: z.coerce.boolean().default(true),
};

export const CreateMonitorSchema = z.discriminatedUnion("type", [
  z.object({
    ...BaseMonitorSchema,
    type: z.literal("http"),
    target: z.httpUrl({
      error: "Target must be a valid http/https URL",
    }),
  }),

  z.object({
    ...BaseMonitorSchema,
    type: z.literal("ssl"),
    target: z.hostname({
      error: "Target must be a valid hostname/domain",
    }),
  }),

  z.object({
    ...BaseMonitorSchema,
    type: z.literal("synthetic"),
    target: z.httpUrl({
      error: "Target must be a valid http/https URL",
    }),
  }),

  z.object({
    ...BaseMonitorSchema,
    type: z.literal("dns"),
    target: z.hostname({
      error: "Target must be a valid hostname/domain",
    }),
  }),

  z.object({
    ...BaseMonitorSchema,
    type: z.literal("tcp"),
    target: z
      .string()
      .regex(/^(?!-)[a-zA-Z0-9.-]+(?<!-):([1-9][0-9]{0,4})$/, {
        error: 'Target must be in "host:port" format',
      })
      .refine(
        (value) => {
          const port = Number(value.split(":").pop());
          return port >= 1 && port <= 65535;
        },
        { error: "Port must be between 1 and 65535" },
      ),
  }),
]);

export type CreateMonitorInput = z.infer<typeof CreateMonitorSchema>;
