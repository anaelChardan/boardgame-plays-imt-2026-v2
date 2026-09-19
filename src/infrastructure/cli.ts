import type { PlayAGame } from '../domain/play-a-game.js';
export async function runCli(
  args: string[],
  play: PlayAGame,
  output: (line: string) => void,
): Promise<number> {
  const [boardgameName, ...players] = args;
  if (!boardgameName || players.length === 0) {
    output('Usage : npm run cli -- "Azul" Alice Bob');
    return 2;
  }
  try {
    output(JSON.stringify(await play({ boardgameName, players })));
    return 0;
  } catch (error) {
    output((error as Error).message);
    return 1;
  }
}
