import {
  Controller,
  All,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Catch-all route for Better Auth handlers - this handles ALL auth endpoints
  @All('*')
  @HttpCode(HttpStatus.OK)
  async handleAuth(
    @Req() request: FastifyRequest,
    @Res({ passthrough: false }) reply: FastifyReply,
  ) {
    // This single endpoint handles all Better Auth routes:
    // POST /api/auth/sign-in/email
    // POST /api/auth/sign-up/email
    // POST /api/auth/sign-out
    // GET /api/auth/session
    // POST /api/auth/verify-email
    // POST /api/auth/forgot-password
    // POST /api/auth/reset-password
    // GET /api/auth/callback/google
    // GET /api/auth/callback/github
    // etc.
    return this.authService.handleAuthRequest(request, reply);
  }
}
