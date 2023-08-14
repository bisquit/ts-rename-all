import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameDir } from '../src/renameDir.js';
import { renameFile } from '../src/renameFile.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('CopiedButton copy.tsx');
});

describe('renameFile', () => {
  test('button => tab', async () => {
    await renameFile(resolveFixturePath('CopiedButton copy.tsx'), {
      destFileName: 'CopiedTab.tsx',
      srcSymbolPattern: 'CopiedButton',
      destSymbolPattern: 'CopiedTab',
    });

    const fixturePath1 = resolveFixturePath('CopiedTab.tsx');
    expect(existsSync(fixturePath1)).toBe(true);
    expect(await readFile(fixturePath1, 'utf-8')).toMatch(
      'function CopiedTab(',
    );
  });
});
