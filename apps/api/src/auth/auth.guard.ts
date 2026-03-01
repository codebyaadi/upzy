import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";

import { AuthService } from "./auth.service.js";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Better-Auth helper
    const session = await this.authService.auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    request.user = session.user;
    request.session = session.session;

    request.organizationId = session.session.activeOrganizationId;

    return true;
  }
}
