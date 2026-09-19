import Fastify from 'fastify';
import { z } from 'zod';
import {
  BoardgameNotFound,
  CatalogUnavailable,
  InvalidParticipants,
  InvalidPlayerCount,
} from '../domain/errors.js';
import type { PlayAGame } from '../domain/play-a-game.js';
import type { PlayReader } from '../domain/ports.js';

const requestSchema = z
  .object({
    boardgameName: z.string().trim().min(1),
    players: z.array(z.string()),
  })
  .strict();
export function buildHttp(play: PlayAGame, reader?: PlayReader) {
  const app = Fastify();
  if (reader) {
    app.get('/plays', async () => reader.all());
  }
  app.post('/plays', async (request, reply) => {
    const parsed = requestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: 'Requête invalide' });
    }
    try {
      return reply.code(201).send(await play(parsed.data));
    } catch (error) {
      if (error instanceof BoardgameNotFound) {
        return reply.code(404).send({ error: error.message });
      }
      if (
        error instanceof InvalidPlayerCount ||
        error instanceof InvalidParticipants
      ) {
        return reply.code(422).send({ error: error.message });
      }
      if (error instanceof CatalogUnavailable) {
        return reply.code(503).send({ error: error.message });
      }
      request.log.error(error);
      return reply.code(500).send({ error: 'Erreur interne' });
    }
  });
  return app;
}
