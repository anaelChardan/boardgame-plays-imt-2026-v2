import { describe, expect, it } from "vitest";
import { buildHttpServer } from "../../../http";
import { boardgameInventoryStub, buildPlayAGame } from "@boardava/domain";

describe("play a game", () => {
  it("should return a 400 if the payload is invalid", async () => {
    const fastify = buildHttpServer({
      playAGame: buildPlayAGame({ boardgameInventory: boardgameInventoryStub }),
    });

    const response = await fastify.inject({
      method: "POST",
      url: "/play",
    });

    expect(response.statusCode).toBe(400);
  });

  it("should return a play", async () => {
    const fastify = buildHttpServer({
      playAGame: buildPlayAGame({ boardgameInventory: boardgameInventoryStub }),
    });

    const response = await fastify.inject({
      method: "POST",
      url: "/play",
      payload: {
        boardgameName: "Brass: Birmingham",
        players: ["John", "Jane"],
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({
      boardgameName: "Brass: Birmingham",
      bggId: "224517",
      players: ["John", "Jane"],
    });
  });
});
