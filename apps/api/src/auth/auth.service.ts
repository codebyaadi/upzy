import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { Auth, AuthConfig, createAuth } from '@upzy/auth/server';
import { EnvType } from '../config/env.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly auth: Auth;

  constructor(private configService: ConfigService<EnvType>) {
    // Initialize auth with config from NestJS ConfigService
    const authConfig: AuthConfig = {
      databaseUrl: this.configService.getOrThrow('DATABASE_URL'),
      trustedOrigins: [
        this.configService.getOrThrow('NEXT_PUBLIC_BASE_URL'),
        this.configService.getOrThrow('NEXT_PUBLIC_BACKEND_URL'),
      ],
    };

    this.auth = createAuth(authConfig);
  }

  async handleAuthRequest(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Construct request URL
      const url = new URL(request.url, `http://${request.headers.host}`);

      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });

      // Create Fetch API-compatible Request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      // Call Better Auth handler
      const response = await this.auth.handler(req);

      // Set status and headers in Fastify reply
      reply.status(response.status);
      response.headers.forEach((value, key) => reply.header(key, value));

      const bodyText = response.body ? await response.text() : null;
      reply.send(bodyText);

      // Return parsed response (optional)
      if (bodyText) {
        try {
          return JSON.parse(bodyText);
        } catch {
          return bodyText;
        }
      }

      return null;
    } catch (error) {
      this.logger.error('Authentication Error:', error);
      reply.status(500).send({
        error: 'Internal authentication error',
        code: 'AUTH_FAILURE',
      });
      return null;
    }
  }

  async getSession(request: FastifyRequest) {
    try {
      // Convert Fastify headers to standard Headers object
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });

      const session = await this.auth.api.getSession({
        headers,
      });

      return session;
    } catch (error) {
      this.logger.error('Session validation error:', error);
      return null;
    }
  }

  async getCurrentUser(request: FastifyRequest) {
    const session = await this.getSession(request);
    return session?.user || null;
  }

  async isAuthenticated(request: FastifyRequest): Promise<boolean> {
    const session = await this.getSession(request);
    return session !== null;
  }

  getAuthInstance(): Auth {
    return this.auth;
  }
}
