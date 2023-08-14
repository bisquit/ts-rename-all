import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameDir } from '../src/renameDir.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('copied-button copy');
});

describe('renameDir', () => {
  test('button => tab', async () => {
    await renameDir(resolveFixturePath('copied-button copy'), {
      destDirName: 'copied-tab',
      srcSymbolPattern: 'copied-button',
      destSymbolPattern: 'copied-tab',
    });

    const fixturePath1 = resolveFixturePath('copied-tab', 'CopiedTab.tsx');
    expect(existsSync(fixturePath1)).toBe(true);
    expect(await readFile(fixturePath1, 'utf-8')).toMatch(
      'function CopiedTab(',
    );
  });
});
