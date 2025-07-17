import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Session, User } from '@upzy/auth';
import { AuthService } from './auth.service';

// Extend FastifyRequest to include user and session properties
declare module 'fastify' {
  interface FastifyRequest {
    user?: User;
    session?: Session;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    try {
      const session = await this.authService.getSession(request);

      if (!session) {
        throw new UnauthorizedException('No valid session found');
      }

      request.user = session.user;
      request.session = session.session;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session');
    }
  }
}
