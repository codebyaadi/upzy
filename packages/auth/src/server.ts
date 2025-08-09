import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, organization } from "better-auth/plugins";
import { createDatabase, authSchema, type Database } from "@upzy/db";
import { sendEmail } from "@upzy/email";
import { getActiveOrganization } from "./utils";

export interface AuthConfig {
  databaseUrl: string; // The connection string is provided by the consumer
  trustedOrigins?: string[];
  // You might add other configuration relevant to auth itself
}

/**
 * Creates and configures the better-auth instance.
 * It takes a databaseUrl to connect to the necessary database.
 */
export function createAuth(config: AuthConfig) {
  // Use createDatabase from @upzy/db to get a memoized Drizzle instance.
  // This ensures that for a given databaseUrl, the same underlying connection pool is reused.
  const dbInstance: Database = createDatabase(config.databaseUrl);

  return betterAuth({
    database: drizzleAdapter(dbInstance, {
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
    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            try {
              // IMPORTANT: Pass the SAME `dbInstance` here.
              // Do NOT call `createDatabase(config.databaseUrl)` again, as it's less efficient.
              // The `dbInstance` already holds the memoized connection.
              const organization = await getActiveOrganization(
                session.userId,
                dbInstance,
              );

              return {
                data: {
                  ...session,
                  activeOrganizationId: organization.id,
                },
              };
            } catch (error) {
              console.error(
                "Auth hook: Failed to set active organization:",
                error,
              );
              return { data: session }; // Still return session even on error to not block auth flow
            }
          },
        },
      },
    },
    trustedOrigins: config.trustedOrigins || [
      process.env.NEXT_PUBLIC_BASE_URL!,
      process.env.NEXT_PUBLIC_BACKEND_URL!,
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;

// Optional: A convenience export for environments that *do* have process.env.DATABASE_URL
// This makes it easy for Next.js API routes or simple backend scripts to use
// the auth package without explicitly passing the URL.
export const auth = createAuth({
  databaseUrl: process.env.DATABASE_URL!, // Relies on env variable being available
});
