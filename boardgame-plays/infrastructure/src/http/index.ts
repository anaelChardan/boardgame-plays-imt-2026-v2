import Fastify from "fastify";
import { validatorCompiler } from "fastify-type-provider-zod";
import { serializerCompiler } from "fastify-type-provider-zod";
import { buildPlayAGame, PlayAGameDependencies } from "./routes/play-a-game";

type Dependencies = PlayAGameDependencies;

export function buildHttpServer(dependencies: Dependencies) {
  const fastify = Fastify({
    logger: process.env.NODE_ENV !== "test",
  });
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  buildPlayAGame(fastify, dependencies);

  return fastify;
}
