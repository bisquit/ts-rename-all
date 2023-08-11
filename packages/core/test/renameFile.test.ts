import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { beforeEach, describe, expect, test } from 'vitest';

import { renameFile } from '../src/index.js';

const testDir = resolve('test-tmp', basename(import.meta.url));

beforeEach(async () => {
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true, force: true });
  }
  await mkdir(testDir, { recursive: true });

  await cp(
    resolve('./fixtures/AppButton.tsx'),
    resolve(testDir, 'AppButton.tsx'),
    {
      force: true,
    },
  );
});

describe('renameFile', () => {
  test('AppButton.tsx => AppTab.tsx', async () => {
    await renameFile(resolve(testDir, 'AppButton.tsx'), {
      destFileName: 'AppTab.tsx',
    });

    expect(existsSync(resolve(testDir, 'AppTab.tsx'))).toBe(true);

    const content = await readFile(resolve(testDir, 'AppTab.tsx'), 'utf-8');
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

  test('AppButton.tsx => AppButtonInput.tsx', async () => {
    await renameFile(resolve(testDir, 'AppButton.tsx'), {
      destFileName: 'AppButtonInput.tsx',
    });

    expect(existsSync(resolve(testDir, 'AppButtonInput.tsx'))).toBe(true);

    const content = await readFile(
      resolve(testDir, 'AppButtonInput.tsx'),
      'utf-8',
    );
    expect(content).toMatchInlineSnapshot(`
      "const InputAPP_BUTTON_SIZES = ['small', 'medium', 'large'] as const;

      type InputAppButtonProps = {
        size: (typeof InputAPP_BUTTON_SIZES)[number];
      };

      export default function InputAppButton({ size }: InputAppButtonProps) {
        return <button>{size}</button>;
      }
      "
    `);
  });
});
