import { describe, expect, it, vi } from "vitest";
import bgg from "bgg-sdk";
import { buildBggBoardgameInventory } from "../../../bgg";
import { mockBrassSearchResult, mockBrassThing } from "./mocks";

vi.mock("bgg-sdk");

const bggMock = vi.mocked(bgg);

describe("play a game", () => {
  it("should return a boardgame", async () => {
    bggMock.search.mockResolvedValue(mockBrassSearchResult);
    bggMock.thing.mockResolvedValue(mockBrassThing);

    const bggApi = buildBggBoardgameInventory();

    const response = await bggApi.getBoardgameByName("Brass: Birmingham");

    expect(response).toBeDefined();
  });
});
