import type { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import type { PlayReader, PlayWriter } from '../domain/ports.js';
export function buildPrismaStore(
  client: PrismaClient,
): PlayWriter & PlayReader {
  return {
    async save(play) {
      await client.play.create({
        data: {
          boardgameName: play.boardgameName,
          bggId: play.bggId,
          playersJson: JSON.stringify(play.players),
        },
      });
    },
    async all() {
      const rows = await client.play.findMany({ orderBy: { id: 'asc' } });
      return rows.map((row) => ({
        boardgameName: row.boardgameName,
        bggId: row.bggId,
        players: z.array(z.string()).parse(JSON.parse(row.playersJson)),
      }));
    },
  };
}
