import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Navigation always uses the main clone, even from a prepared checkpoint.
const commonGitDir = spawnSync(
  'git',
  ['rev-parse', '--path-format=absolute', '--git-common-dir'],
  {
    cwd: scriptRoot,
    encoding: 'utf8',
  },
);
if (commonGitDir.status !== 0) {
  throw new Error('Le navigateur de cours nécessite un clone Git.');
}
const root = dirname(commonGitDir.stdout.trim());
const steps = JSON.parse(readFileSync(resolve(root, 'course.json'), 'utf8'));
const [action = 'list', id, toId] = process.argv.slice(2);
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function run(command, args, cwd = root, capture = false) {
  const r = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? 'pipe' : 'inherit',
  });
  if (r.error) {
    throw r.error;
  }
  if (r.status !== 0) {
    throw new Error(
      capture
        ? r.stderr || `${command} a échoué`
        : `${command} a échoué (${r.status})`,
    );
  }
  return r.stdout?.trim() || '';
}
function step(value) {
  const s = steps.find(
    (s) => s.step === String(value).padStart(2, '0') || s.name === value,
  );
  if (!s) {
    throw new Error('Étape inconnue. Utiliser : npm run course -- list');
  }
  return s;
}
function show(s) {
  console.log(`${s.step} · ${s.title}
Tag : ${s.ref}
Fichier : ${s.file}
Slides : ${s.slidesUrl}`);
}
function prepare(s) {
  const sha = run(
    'git',
    ['rev-parse', '--verify', `${s.ref}^{commit}`],
    root,
    true,
  );
  const dir = resolve(root, '.course-worktrees', 'v3', s.name);
  if (!existsSync(dir)) {
    const registrations = run(
      'git',
      ['worktree', 'list', '--porcelain', '-z'],
      root,
      true,
    )
      .split('\0\0')
      .map((entry) => entry.split('\0'))
      .filter((fields) => fields.includes(`worktree ${dir}`));
    for (const fields of registrations) {
      if (
        fields.some(
          (field) => field === 'locked' || field.startsWith('locked '),
        )
      ) {
        throw new Error(
          `Le worktree ${dir} est verrouillé. Référence conservée.`,
        );
      }
      if (!fields.includes('detached') || !fields.includes(`HEAD ${sha}`)) {
        throw new Error(
          `Le worktree absent ${dir} contient une référence différente du checkpoint. Référence conservée.`,
        );
      }
    }
    // A single --force lets Git replace a missing registration, never an
    // existing directory or a locked worktree. No global prune is needed.
    const recovery = registrations.length > 0 ? ['--force'] : [];
    if (recovery.length) {
      console.log(`Recréation du checkpoint absent : ${dir}`);
    }
    run('git', ['worktree', 'add', '--detach', ...recovery, dir, sha]);
  }
  if (run('git', ['rev-parse', 'HEAD'], dir, true) !== sha) {
    throw new Error(
      `Le worktree ${dir} pointe sur un autre commit. Aucune modification effectuée.`,
    );
  }
  if (run('git', ['status', '--porcelain'], dir, true)) {
    throw new Error(
      `Modifications conservées dans ${dir}. Utiliser un autre clone pour une réponse intacte.`,
    );
  }
  const marker = resolve(dir, 'node_modules/.course-ready');
  const fingerprint =
    sha +
    ':' +
    process.version +
    ':' +
    createHash('sha256')
      .update(readFileSync(resolve(dir, 'package-lock.json')))
      .digest('hex');
  if (!existsSync(marker) || readFileSync(marker, 'utf8') !== fingerprint) {
    run(npm, ['ci', '--no-audit', '--no-fund'], dir);
    run(npm, ['run', 'build'], dir);
    writeFileSync(marker, fingerprint);
  }
  show(s);
  console.log(`Dossier : ${dir}
Ouvrir : ${resolve(dir, s.file)}`);
  return dir;
}
try {
  if (action === 'warmup') {
    steps.forEach(prepare);
  } else if (action === 'verify') {
    for (const s of steps) {
      const dir = prepare(s);
      run(npm, ['run', 'check'], dir);
      run(npm, ['run', 'demo'], dir);
    }
    console.log(
      '10 checkpoints : compilation, tests et démonstrations vérifiés.',
    );
  } else if (action === 'list') {
    steps.forEach((s) => {
      console.log(`${s.step}  ${s.title}  (${s.ref})`);
    });
  } else if (action === 'show') {
    show(step(id));
  } else if (action === 'diff') {
    run('git', [
      'diff',
      step(id).ref,
      step(toId).ref,
      '--',
      'src',
      'tests',
      'examples',
    ]);
  } else if (
    action === 'prepare' ||
    action === 'run' ||
    action === 'test' ||
    action === 'next'
  ) {
    let s = step(id);
    if (action === 'next') {
      const next = steps[steps.indexOf(s) + 1];
      if (!next) {
        throw new Error('Dernière étape atteinte.');
      }
      s = next;
    }
    const dir = prepare(s);
    if (action === 'run') {
      run(npm, ['run', 'demo'], dir);
    }
    if (action === 'test') {
      run(npm, ['run', 'check'], dir);
    }
  } else {
    throw new Error(
      'Commande inconnue : list, show, diff, warmup, verify, prepare, run, test, next.',
    );
  }
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
