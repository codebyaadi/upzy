import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@upzy/db";
import type { FastifyReply } from "fastify";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    switch (exception.code) {
      case "P2002": {
        const status = HttpStatus.CONFLICT;
        response.status(status).send({
          statusCode: status,
          message: "Unique constraint failed on the database.",
          error: "Conflict",
        });
        break;
      }
      case "P2025": {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).send({
          statusCode: status,
          message: "Record not found.",
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
