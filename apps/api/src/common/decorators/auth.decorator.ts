import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

import type { AuthenticatedRequest } from "../../auth/auth.types.js";

/**
 * Extracts the authenticated user from the request.
 */
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
  return request.user;
});

/**
 * Extracts the active session from the request.
 */
export const CurrentSession = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
  return request.session;
});

/**
 * Extracts the active organization ID from the request session.
 */
export const CurrentOrganizationId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const orgId = request.session.activeOrganizationId;

    if (!orgId) {
      throw new UnauthorizedException("No active organization context found.");
    }

    return orgId;
  },
);

/**
 * Extracts the active team ID from the request session.
 */
export const CurrentTeamId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
  const teamId = request.session.activeTeamId;

  if (!teamId) {
    throw new UnauthorizedException("No active team context found.");
  }

  return teamId;
});
