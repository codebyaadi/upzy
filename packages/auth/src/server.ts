import { betterAuth, number } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { createDatabase, schema } from "@upzy/db";
import { sendEmail } from "@upzy/email";

export interface AuthConfig {
  databaseUrl: string;
  trustedOrigins?: string[];
}

export function createAuth(config: AuthConfig) {
  return betterAuth({
    database: drizzleAdapter(createDatabase(config.databaseUrl), {
      provider: "pg",
      schema: {
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, token, url }, request) => {
          await sendEmail(email, "Here is your magic link", "MagicLinkEmail", {
            userName: email,
            loginUrl: url,
          });
        },
      }),
    ],
    trustedOrigins: config.trustedOrigins || [
      process.env.NEXT_PUBLIC_BASE_URL!, // Next.js frontend
      process.env.NEXT_PUBLIC_BACKEND_URL!, // NestJS backend
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;

// Default export for environments where env is available
export const auth = createAuth({
  databaseUrl: process.env.DATABASE_URL!,
});
