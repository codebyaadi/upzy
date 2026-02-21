import { prisma } from "@upzy/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    organization({
      teams: {
        enabled: true,
        maximumTeams: 10,
      },
    }),
  ],
});
