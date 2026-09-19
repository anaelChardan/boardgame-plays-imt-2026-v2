import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { expect, it } from 'vitest';

it('démarre un vrai serveur et traite une requête avant de fermer', async () => {
  const child = spawn(process.execPath, ['--import', 'tsx', 'src/server.ts'], {
    env: { ...process.env, PORT: '0', CATALOG: 'fixture', STORAGE: 'memory' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const exited = once(child, 'exit');
  let errors = '';
  child.stderr.on('data', (chunk) => {
    errors += String(chunk);
  });
  try {
    const address = await new Promise<string>((resolve, reject) => {
      let output = '';
      const timeout = setTimeout(
        () => reject(new Error(`Démarrage trop long: ${errors}`)),
        5000,
      );
      child.once('exit', () => {
        clearTimeout(timeout);
        reject(new Error(`Serveur arrêté: ${errors}`));
      });
      child.once('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
      child.stdout.on('data', (chunk) => {
        output += String(chunk);
        const match = output.match(/http:\/\/127\.0\.0\.1:\d+/);
        if (match) {
          clearTimeout(timeout);
          resolve(match[0]);
        }
      });
    });
    const response = await fetch(`${address}/plays`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        boardgameName: 'Azul',
        players: ['Alice', 'Bob'],
      }),
      signal: AbortSignal.timeout(3000),
    });
    expect(response.status).toBe(201);
    expect((await response.json()).players).toEqual(['Alice', 'Bob']);
  } finally {
    child.kill('SIGTERM');
    await exited;
  }
}, 10000);
