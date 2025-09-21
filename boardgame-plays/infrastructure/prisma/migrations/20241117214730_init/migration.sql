-- CreateTable
CREATE TABLE "plays" (
    "id" TEXT NOT NULL,
    "boardgameName" TEXT NOT NULL,
    "bggId" TEXT NOT NULL,
    "players" JSONB NOT NULL,

    CONSTRAINT "plays_pkey" PRIMARY KEY ("id")
);
