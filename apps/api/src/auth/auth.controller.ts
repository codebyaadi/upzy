import { Controller, All, Req, Res, Logger } from "@nestjs/common";
import type { FastifyReply, FastifyRequest } from "fastify";

import { Public } from "../common/decorators/public.decorator.js";
import { AuthService } from "./auth.service.js";

@Public()
@Controller("api/auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Catch-all handler that proxies all requests to the better-auth handler.
   *
   * Fastify parses the body before this runs, so we re-serialize it to pass
   * a standards-compliant Request object to better-auth.
   */
  @All("*")
  async handleAuth(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    try {
      const protocol = request.protocol ?? "http";
      const host = request.headers.host ?? "localhost";
      const url = `${protocol}://${host}${request.url}`;

      const headers = new Headers();
      for (const [key, value] of Object.entries(request.headers)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
          for (const v of value) headers.append(key, v);
        } else {
          headers.set(key, value);
        }
      }

      const hasBody = request.method !== "GET" && request.method !== "HEAD";
      let body: string | undefined;

      if (hasBody && request.body != null) {
        body = typeof request.body === "string" ? request.body : JSON.stringify(request.body);

        // Ensure content-type is set so better-auth can parse it
        if (!headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
      }

      const req = new Request(url, {
        method: request.method,
        headers,
        body,
      });

      const response = await this.authService.auth.handler(req);

      reply.status(response.status);

      response.headers.forEach((value, key) => {
        void reply.header(key, value);
      });

      const responseBody = await response.text();
      return reply.send(responseBody);
    } catch (error) {
      this.logger.error("better-auth handler error", error);
      return reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  }
}
