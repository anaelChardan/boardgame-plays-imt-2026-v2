import { FastifyInstance } from "fastify";
import { PlayAGame } from "@boardava/domain";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export type PlayAGameDependencies = {
  playAGame: PlayAGame;
};

export function buildPlayAGame(
  fastify: FastifyInstance,
  dependencies: PlayAGameDependencies
) {
  const { playAGame } = dependencies;
  const playAGamePayloadSchema = z.object({
    boardgameName: z.string(),
    players: z.array(z.string()),
  });

  const playAGameResponseSchema = z.object({
    boardgameName: z.string(),
    bggId: z.string(),
    players: z.array(z.string()),
  });

  fastify.withTypeProvider<ZodTypeProvider>().post(
    "/play",
    {
      schema: {
        body: playAGamePayloadSchema,
        response: {
          201: playAGameResponseSchema,
        },
      },
    },
    async (request, response) => {
      const play = await playAGame.forBoardgame(
        request.body.boardgameName,
        request.body.players
      );

      response.status(201).send(play);
    }
  );
}
