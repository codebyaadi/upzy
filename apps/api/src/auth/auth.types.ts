import type { AuthSession, AuthUser } from "@upzy/auth/types";
import type { FastifyRequest } from "fastify";

export interface AuthenticatedRequest extends FastifyRequest {
  user: AuthUser;
  session: AuthSession;
}
