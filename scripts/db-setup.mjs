import { spawnSync } from 'node:child_process';
const command = process.platform === 'win32' ? 'node_modules/.bin/prisma.cmd' : 'node_modules/.bin/prisma';
const result = spawnSync(command, ['db', 'push', '--skip-generate'], {
  stdio: 'inherit', env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL || 'file:./classroom.db' }
});
process.exit(result.status ?? 1);
