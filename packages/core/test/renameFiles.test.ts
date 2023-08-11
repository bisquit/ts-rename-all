import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameFiles } from '../src/index.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('mixed-button');
});

describe('renameFiles', () => {
  test('button => tab', async () => {
    await renameFiles(resolveFixturePath('mixed-button'), {
      srcFileNamePattern: 'button',
      destFileNamePattern: 'tab',
    });

    const fixturePath1 = resolveFixturePath(
      'mixed-button',
      'mixed_tab_type.ts',
    );
    expect(existsSync(fixturePath1)).toBe(true);
    expect(await readFile(fixturePath1, 'utf-8')).toMatch(
      'export const mixedTabType =',
    );

    const fixturePath2 = resolveFixturePath('mixed-button', 'MixedTab.tsx');
    expect(existsSync(fixturePath2)).toBe(true);
    expect(await readFile(fixturePath2, 'utf-8')).toMatch(
      'export default function MixedTab({ type }: MixedTabProps)',
    );

    const fixturePath3 = resolveFixturePath('mixed-button', 'use-mixed-tab.ts');
    expect(existsSync(fixturePath3)).toBe(true);
    expect(await readFile(fixturePath3, 'utf-8')).toMatch(
      'export function useMixedTab()',
    );
  });
});
