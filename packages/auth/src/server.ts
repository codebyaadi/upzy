import type { PrismaClient } from "@upzy/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";

export const createAuth = (prisma: PrismaClient) => {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000/api/auth",
    trustedOrigins: ["http://localhost:3001"],
    database: prismaAdapter(prisma, {
      provider: "postgresql",
      usePlural: true,
    }),
    experimental: {
      joins: true,
    },
    emailAndPassword: { enabled: true, autoSignIn: true },
    plugins: [
      organization({
        teams: { enabled: true, maximumTeams: 10 },
      }),
    ],
  });
};

export const auth = createAuth({} as any);
