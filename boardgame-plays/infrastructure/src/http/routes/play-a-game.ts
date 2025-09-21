import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export function buildPlayAGame(fastify: FastifyInstance) {
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
    async (_request, response) => {
      const play = {
        boardgameName: "Brass: Birmingham",
        bggId: "224517",
        players: ["John", "Jane"],
      };

      response.status(201).send(play);
    }
  );
}
