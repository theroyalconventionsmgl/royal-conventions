const fs = require('fs');
const { spawnSync } = require('child_process');

const content = fs.readFileSync('.env.local', 'utf8');
const keys = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

function getValue(key) {
  const line = content.split(/\r?\n/).find(l =>
    new RegExp('^\\s*(?:export\\s+)?' + key + '\\s*=').test(l)
  );
  if (!line) return '';
  let v = line.slice(line.indexOf('=') + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

for (const key of keys) {
  if (!getValue(key)) {
    console.error(`Missing ${key}; no upload started.`);
    process.exit(1);
  }
}

for (const key of keys) {
  console.log(`Updating ${key} in Preview...`);
  const result = spawnSync('npx', [
    'vercel@64.3.1', 'env', 'add', key, 'preview',
    '--git-branch', 'feat/complete-venue-platform',
    '--force', '--type', 'config', '--yes'
  ], {
    input: getValue(key) + '\n',
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe']
  });

  if (result.status !== 0) {
    console.error(`Failed updating ${key}.`);
    console.error(result.stderr || result.stdout || 'Unknown CLI error');
    process.exit(result.status || 1);
  }
  console.log(`Updated ${key}`);
}
console.log('All six Preview variables processed.');
