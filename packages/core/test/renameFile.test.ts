import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameFile } from '../src/index.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('AppButton.tsx');
});

describe('renameFile', () => {
  test('AppButton.tsx => AppTab.tsx', async () => {
    await renameFile(resolveFixturePath('AppButton.tsx'), {
      destFileName: 'AppTab.tsx',
    });

    expect(existsSync(resolveFixturePath('AppTab.tsx'))).toBe(true);

    const content = await readFile(resolveFixturePath('AppTab.tsx'), 'utf-8');
    expect(content).toMatchInlineSnapshot(`
      "const APP_BUTTON_SIZES = ['small', 'medium', 'large'] as const;

      type AppTabProps = {
        size: (typeof APP_BUTTON_SIZES)[number];
      };

      export default function AppTab({ size }: AppTabProps) {
        return <button>{size}</button>;
      }
      "
    `);
  });
});
