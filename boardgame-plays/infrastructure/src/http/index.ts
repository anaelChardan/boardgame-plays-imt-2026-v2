import Fastify from "fastify";
import { validatorCompiler } from "fastify-type-provider-zod";
import { serializerCompiler } from "fastify-type-provider-zod";
import { buildPlayAGame } from "./routes/play-a-game";

export function buildHttpServer() {
  const fastify = Fastify({
    logger: process.env.NODE_ENV !== "test",
  });
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  buildPlayAGame(fastify);

  return fastify;
}
