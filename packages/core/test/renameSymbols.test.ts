import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { describe } from 'node:test';

import { beforeEach, expect, test } from 'vitest';

import { renameSymbols } from '../src/index.js';

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

describe('renameSymbols', () => {
  test('Button => Tab', async () => {
    await renameSymbols(resolve(testDir, 'AppButton.tsx'), {
      before: 'Button',
      after: 'Tab',
    });

    const content = await readFile(resolve(testDir, 'AppButton.tsx'), 'utf-8');
    expect(content).toMatchInlineSnapshot(`
      "const APP_TAB_SIZES = ['small', 'medium', 'large'] as const;

      type AppTabProps = {
        size: (typeof APP_TAB_SIZES)[number];
      };

      export default function AppTab({ size }: AppTabProps) {
        return <button>{size}</button>;
      }
      "
    `);
  });
});
