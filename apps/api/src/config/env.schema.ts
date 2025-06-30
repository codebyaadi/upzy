import { z } from 'zod';

export const envSchema = z.object({
  // Application
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // URLs
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().url(),

  // Email
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().transform((val) => parseInt(val, 10)),
  EMAIL_USER: z.string().optional().nullable(),
  EMAIL_PASS: z.string().optional().nullable(),
  EMAIL_FROM: z.string(),

  // Auth
  BETTER_AUTH_SECRET: z.string(),
});

export type EnvType = z.infer<typeof envSchema>;
