import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameSymbols } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturesDir = resolve(__dirname, '../fixtures');
const testTmpDir = resolve(__dirname, './tmp');

export async function setupFixture(importMeta: ImportMeta) {
  const testFixturesDir = resolve(testTmpDir, basename(importMeta.url));

  const resetDir = async () => {
    if (existsSync(testFixturesDir)) {
      await rm(testFixturesDir, { recursive: true, force: true });
    }
    await mkdir(testFixturesDir, { recursive: true });
  };

  const copyFixture = async (fixturePath: string) => {
    await cp(
      resolve(fixturesDir, fixturePath),
      resolve(testFixturesDir, basename(fixturePath)),
      {
        force: true,
        recursive: true,
      },
    );
  };

  const resolveFixturePath = (...path: string[]) => {
    return resolve(testFixturesDir, ...path);
  };

  return {
    resetDir,
    copyFixture,
    resolveFixturePath,
  };
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
