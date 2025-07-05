import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, organization } from "better-auth/plugins";
import { createDatabase, authSchema } from "@upzy/db";
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
        ...authSchema,
      },
      usePlural: true,
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
      organization({
        teams: {
          enabled: true,
          maximumTeams: 10,
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
