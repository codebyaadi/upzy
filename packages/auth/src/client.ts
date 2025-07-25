import {
  magicLinkClient,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  plugins: [
    magicLinkClient(),
    organizationClient({
      teams: {
        enabled: true,
        maximumTeams: 10,
      },
    }),
  ],
});
