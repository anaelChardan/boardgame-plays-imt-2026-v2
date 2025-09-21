import { describe, it, expect } from "vitest";
import { Play } from "../../model/play";
import { PlayAGame, buildPlayAGame } from "../../use_cases/play-a-game";

describe("Play a game functionnal tests", () => {
  it("should play a game with the correct number of players", async () => {
    // Given
    const boardgameName = "Brass Birmingham";
    const players = ["Michel", "John"];

    // When
    // le but est d'appeler le domain
    const playAGame: PlayAGame = buildPlayAGame({
      boardgameInventory: { // injection d'un stup
        getBoardgameByName: async (name: string) => {
          return {
            name,
            bggId: "224517",
            maxNumberOfPlayers: 4,
            minNumberOfPlayers: 2,
          };
        },
      },
    });

    const play: Play = await playAGame.forBoardgame(boardgameName, players);

    // Then
    expect(play).toStrictEqual({
      boardgameName: "Brass Birmingham",
      bggId: "224517",
      players: ["Michel", "John"],
    });
  });
});
