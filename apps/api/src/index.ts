import fastify, { FastifyInstance } from "fastify";

import healthRoutes from "@/routes/health";

const server: FastifyInstance = fastify({
  logger: true,
});

async function start() {
  server.register(healthRoutes, { prefix: "/health" });

  try {
    await server.listen({ port: 8000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

start();
