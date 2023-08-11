import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameSymbols } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturesDir = resolve(__dirname, '../fixtures');

export async function setupFixture(importMeta: ImportMeta) {
  const testDir = dirname(fileURLToPath(importMeta.url));
  const testFixtureDir = resolve(testDir, basename(importMeta.url));
  // const testDir = resolve('test-tmp', basename(import.meta.url));
  await resetDir(testFixtureDir);
}

export async function resetDir(dirPath: string) {
  if (existsSync(dirPath)) {
    await rm(dirPath, { recursive: true, force: true });
  }
  await mkdir(dirPath, { recursive: true });
}

// export async function copyFixture(fixturePath: string) {
//   await cp(
//     resolve(fixturesDir, fixturePath),
//     resolve(testDir, 'AppButton.tsx'),
//     {
//       force: true,
//     },
//   );
// }
