import type { Session as BaseSession } from "better-auth/types";
export type { User } from "better-auth/types";

interface Session extends BaseSession {
  activeOrganizationId?: string | null;
}
export type { Session };
