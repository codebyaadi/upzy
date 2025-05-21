import { FastifyInstance } from "fastify";

async function healthRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
              uptime: { type: "number" },
              timestamp: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      };
    },
  );
}

export default healthRoutes;
