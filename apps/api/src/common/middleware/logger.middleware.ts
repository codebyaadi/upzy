import { Logger } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Logs incoming requests and their response status.
 * @param req The incoming request object.
 * @param res The server's response object.
 * @param next A function to pass control to the next middleware.
 */
export function logger(
  req: FastifyRequest['raw'],
  res: FastifyReply['raw'],
  next: () => void,
) {
  // Create a logger instance with the context 'HTTP'
  const logger = new Logger('HTTP');

  const { method, url } = req;
  const startTime = Date.now();

  // The 'finish' event is fired when the response is sent
  res.on('finish', () => {
    const { statusCode } = res;
    const duration = Date.now() - startTime;

    // Log the request details
    logger.log(`${method} ${url} ${statusCode} - ${duration}ms`);
  });

  next();
}
