import { prisma } from "../../../database/prisma";
import {
  setupTestContainers,
  shutdownTestContainers,
  TestContainers,
  testContainersTimeout,
} from "./test-containers";
import { afterAll, beforeAll, expect, test, vi } from "vitest";

let testContainers: TestContainers;
vi.setConfig({
  testTimeout: testContainersTimeout,
});

beforeAll(async () => {
  testContainers = await setupTestContainers();
}, testContainersTimeout);

afterAll(async () => {
  await shutdownTestContainers(testContainers);
}, testContainersTimeout);

test("it tests the db", async () => {
  const result = await prisma.$queryRaw`SELECT * FROM _prisma_migrations`;
  expect(result).toBeDefined();
});
