import { PrismaClient } from "@prisma/client";

export let prisma = new PrismaClient();

export function resetPrisma(url: string) {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });
}
