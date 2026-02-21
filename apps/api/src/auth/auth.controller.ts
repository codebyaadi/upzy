import { Controller, All, Req, Res, Logger } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

import { AuthService } from "./auth.service.js";

@Controller("api/auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @All("*")
  async handleAuth(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    try {
      const protocol = request.protocol || "http";
      const host = request.headers.host;
      const url = `${protocol}://${host}${request.url}`;

      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => headers.append(key, v));
          } else {
            headers.append(key, value.toString());
          }
        }
      });

      const req = new Request(url, {
        method: request.method,
        headers,
        body:
          request.method !== "GET" && request.method !== "HEAD"
            ? JSON.stringify(request.body)
            : undefined,
      });
    } catch (error) {
      this.logger.error("Authentication Error:", error);
      return reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  }
}
