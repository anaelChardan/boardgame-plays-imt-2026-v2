import { buildHttpServer } from "@boardava/infrastructure";

const fastify = buildHttpServer();

try {
  fastify.listen({ port: 3000 });
  console.log("Server is running on port 3000");
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
