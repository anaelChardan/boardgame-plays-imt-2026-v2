import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Wait } from "testcontainers";
import { prisma, resetPrisma } from "../../../database/prisma";
import { eventually, getExistingPathFromRootDirectory } from "./utils";

export const testContainersTimeout = 15_000;

async function isPrismaReady() {
  const result = await prisma.$queryRaw<
    { count: number }[]
  >`SELECT COUNT(*)::integer as count FROM _prisma_migrations`;

  if (result.length === 0) {
    return {
      kind: "not-good" as const,
    };
  }

  const count = result[0]?.count;

  if (count === undefined) {
    return {
      kind: "not-good" as const,
    };
  }

  if (count > 0) {
    return {
      kind: "good" as const,
      data: count,
    };
  }

  return {
    kind: "not-good" as const,
  };
}

export async function setupTestContainers() {
  const backupStructureFilePath = getExistingPathFromRootDirectory(
    "boardgame-plays/infrastructure/dataset/backup_structure.sql"
  );

  const main = new PostgreSqlContainer("postgres:15.7")
    .withCopyFilesToContainer([
      {
        source: backupStructureFilePath,
        target: "/docker-entrypoint-initdb.d/backup_structure.sql",
      },
    ])
    .withTmpFs({ "/var/lib/postgresql/data": "rw" })
    .withWaitStrategy(Wait.forListeningPorts());

  const mainContainer = await main.start();

  resetPrisma(mainContainer.getConnectionUri());

  await eventually(isPrismaReady, 5_000, 100);

  return {
    mode: "USING_TEST_CONTAINERS",
    urls: {
      databaseUrl: mainContainer.getConnectionUri(),
    },
    shutdown: async () => {
      await prisma.$disconnect();
      await mainContainer.stop();
    },
  };
}

export type TestContainers = Awaited<ReturnType<typeof setupTestContainers>>;

export async function shutdownTestContainers(containers: TestContainers) {
  if (!containers) {
    return;
  }
  await containers.shutdown();
}
