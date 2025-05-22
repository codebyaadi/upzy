import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { db } from "@upzy/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  plugins: [
    organization({
      teams: {
        enabled: true,
        maximumTeams: 10,
      },
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});
