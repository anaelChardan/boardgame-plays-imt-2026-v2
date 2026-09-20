import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, expect, it } from 'vitest';

const script = fileURLToPath(new URL('../scripts/course.mjs', import.meta.url));
let root: string;
let checkpoint: string;

function git(args: string[], cwd = root) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(result.stderr);
  }
  return result.stdout.trim();
}

function prepare(action = 'prepare', id = '00') {
  return spawnSync(process.execPath, ['scripts/course.mjs', action, id], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, npm_config_offline: 'true' },
  });
}

beforeEach(() => {
  root = realpathSync(mkdtempSync(resolve(tmpdir(), 'imt-navigation-')));
  checkpoint = resolve(root, '.course-worktrees/v3/00 with spaces');
  mkdirSync(resolve(root, 'scripts'));
  copyFileSync(script, resolve(root, 'scripts/course.mjs'));
  writeFileSync(
    resolve(root, '.gitignore'),
    '.course-worktrees/\nnode_modules/\n',
  );
  const manifest = {
    name: 'course-navigation-fixture',
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      // This dependency-free fixture still needs the install-cache directory.
      build:
        "node -e \"require('node:fs').mkdirSync('node_modules', { recursive: true })\"",
      demo: 'node -e "console.log(\'fixture demo\')"',
    },
  };
  writeFileSync(resolve(root, 'package.json'), JSON.stringify(manifest));
  writeFileSync(
    resolve(root, 'package-lock.json'),
    JSON.stringify({
      name: manifest.name,
      version: manifest.version,
      lockfileVersion: 3,
      requires: true,
      packages: { '': { name: manifest.name, version: manifest.version } },
    }),
  );
  writeFileSync(
    resolve(root, 'course.json'),
    JSON.stringify([
      {
        step: '00',
        name: '00 with spaces',
        title: 'Fixture',
        ref: 'course-test/00',
        file: 'package.json',
        slidesUrl: 'https://example.com',
      },
    ]),
  );
  git(['init', '-q']);
  git(['config', 'user.name', 'Course test']);
  git(['config', 'user.email', 'course-test@example.com']);
  git(['add', '.']);
  git(['-c', 'commit.gpgsign=false', 'commit', '-qm', 'Fixture']);
  git(['tag', 'course-test/00']);
  git(['worktree', 'add', '--detach', checkpoint, 'course-test/00']);
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

it('recreates a deleted checkpoint and preserves unrelated registrations', () => {
  const other = resolve(root, '.course-worktrees/other');
  git(['worktree', 'add', '--detach', other, 'HEAD']);
  rmSync(checkpoint, { recursive: true });
  rmSync(other, { recursive: true });

  const result = prepare();
  expect(result.status, result.stderr).toBe(0);
  expect(result.stdout).toContain('Recréation du checkpoint absent');
  expect(git(['rev-parse', 'HEAD'], checkpoint)).toBe(
    git(['rev-parse', 'course-test/00']),
  );
  expect(git(['worktree', 'list', '--porcelain'])).toContain(
    `worktree ${other}`,
  );
  expect(prepare().status).toBe(0);
}, 15000);

it('handles duplicate stale registrations for the same missing checkpoint', () => {
  const metadata = git(
    ['rev-parse', '--path-format=absolute', '--git-dir'],
    checkpoint,
  );
  cpSync(metadata, resolve(dirname(metadata), 'duplicate'), {
    recursive: true,
  });
  rmSync(checkpoint, { recursive: true });
  const result = prepare();
  expect(result.status, result.stderr).toBe(0);
  expect(existsSync(resolve(checkpoint, 'package.json'))).toBe(true);
}, 15000);

it('preserves a missing locked checkpoint', () => {
  git(['worktree', 'lock', '--reason', 'offline disk', checkpoint]);
  rmSync(checkpoint, { recursive: true });
  const before = git(['worktree', 'list', '--porcelain', '-z']);
  const result = prepare();
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('verrouillé');
  expect(git(['worktree', 'list', '--porcelain', '-z'])).toBe(before);
  expect(existsSync(checkpoint)).toBe(false);
});

it('preserves a missing checkpoint with a custom commit', () => {
  writeFileSync(resolve(checkpoint, 'personal.txt'), 'local work');
  git(['add', '.'], checkpoint);
  git(
    ['-c', 'commit.gpgsign=false', 'commit', '-qm', 'Personal work'],
    checkpoint,
  );
  const personal = git(['rev-parse', 'HEAD'], checkpoint);
  rmSync(checkpoint, { recursive: true });
  const result = prepare();
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('référence différente');
  expect(git(['worktree', 'list', '--porcelain'])).toContain(
    `HEAD ${personal}`,
  );
});

it('does not overwrite edits in an existing checkpoint', () => {
  const file = resolve(checkpoint, 'package.json');
  writeFileSync(file, `${readFileSync(file, 'utf8')}\n`);
  const before = readFileSync(file, 'utf8');
  const result = prepare();
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('Modifications conservées');
  expect(readFileSync(file, 'utf8')).toBe(before);
  expect(prepare('present').status).not.toBe(0);
  expect(readFileSync(file, 'utf8')).toBe(before);
});

it('presents the starting point without requiring a previous checkpoint', () => {
  const result = prepare('present');
  expect(result.status, result.stderr).toBe(0);
  expect(result.stdout).toContain('Point de départ');
  expect(result.stdout).toContain('fixture demo');
  expect(git(['status', '--porcelain'], checkpoint)).toBe('');
}, 15000);

it('shows a focused transition and runs the destination demo without editing code', () => {
  writeFileSync(resolve(root, 'lesson.txt'), 'new concept\n');
  writeFileSync(
    resolve(root, 'unrelated.txt'),
    'not part of the walkthrough\n',
  );
  git(['add', '.']);
  git(['-c', 'commit.gpgsign=false', 'commit', '-qm', 'Next checkpoint']);
  git(['tag', 'course-test/01']);
  const metadata = JSON.parse(
    readFileSync(resolve(root, 'course.json'), 'utf8'),
  );
  metadata.push({
    step: '01',
    name: '01-next',
    title: 'Next',
    ref: 'course-test/01',
    file: 'lesson.txt',
    files: ['lesson.txt', 'package.json'],
    focus: ['lesson.txt'],
    goal: 'explain the new concept',
    expected: 'observe the demo',
    slidesUrl: 'https://example.com/next',
  });
  writeFileSync(resolve(root, 'course.json'), JSON.stringify(metadata));
  const result = prepare('present', '01');
  expect(result.status, result.stderr).toBe(0);
  expect(result.stdout).toContain('Évolution 00 → 01');
  expect(result.stdout).toContain('+new concept');
  expect(result.stdout).not.toContain('not part of the walkthrough');
  expect(result.stdout).toContain('explain the new concept');
  expect(result.stdout).toContain('observe the demo');
  expect(result.stdout).toContain('fixture demo');
  expect(
    git(
      ['status', '--porcelain'],
      resolve(root, '.course-worktrees/v3/01-next'),
    ),
  ).toBe('');
}, 15000);
