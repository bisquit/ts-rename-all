import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameAll } from '../src/renameAll.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('mixed-button');
});

describe('renameAll', () => {
  test('button => tab', async () => {
    await renameAll([resolveFixturePath('mixed-button')], {
      srcSymbolPattern: 'button',
      destSymbolPattern: 'tab',
    });

    const fixturePath1 = resolveFixturePath('mixed-tab', 'mixed_tab_type.ts');
    expect(existsSync(fixturePath1)).toBe(true);
    expect(await readFile(fixturePath1, 'utf-8')).toMatch(
      'export const mixedTabType =',
    );

    const fixturePath2 = resolveFixturePath('mixed-tab', 'MixedTab.tsx');
    expect(existsSync(fixturePath2)).toBe(true);
    expect(await readFile(fixturePath2, 'utf-8')).toMatch(
      'export default function MixedTab({ type }: MixedTabProps)',
    );

    const fixturePath3 = resolveFixturePath('mixed-tab', 'use-mixed-tab.ts');
    expect(existsSync(fixturePath3)).toBe(true);
    expect(await readFile(fixturePath3, 'utf-8')).toMatch(
      'export function useMixedTab()',
    );

    const nestedDir1 = resolveFixturePath('mixed-tab', 'nested-mixed-tab');
    expect(existsSync(nestedDir1)).toBe(true);

    const nestedPath1 = resolveFixturePath(
      'mixed-tab',
      'nested-mixed-tab',
      'NestedMixedTab.tsx',
    );
    expect(existsSync(nestedPath1)).toBe(true);
    expect(await readFile(nestedPath1, 'utf-8')).toMatch(
      'export default function NestedMixedTab({ type }: NestedMixedTabProps)',
    );
  });
});
