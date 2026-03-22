import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import type { AuthenticatedRequest } from "./auth.types.js";

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
    return request.session.activeOrganizationId;
  },
);

/**
 * Extracts the active team ID from the request session.
 */
export const CurrentTeamId = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
  return request.session.activeTeamId;
});
