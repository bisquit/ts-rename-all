import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { beforeEach, expect, test } from 'vitest';

import { renameSymbols } from '../src/renameSymbols.js';

const testDir = resolve('test-tmp', basename(import.meta.url));

beforeEach(async () => {
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true, force: true });
  }
  await mkdir(testDir, { recursive: true });

  await cp(
    resolve('../../fixtures/AppButton.tsx'),
    resolve(testDir, 'AppButton.tsx'),
    {
      force: true,
    },
  );
});

test('renameSymbols', async () => {
  await renameSymbols(resolve(testDir, 'AppButton.tsx'), {
    srcSymbolPattern: 'Button',
    destSymbolPattern: 'Tab',
  });

  const content = await readFile(resolve(testDir, 'AppButton.tsx'), 'utf-8');
  expect(content).toMatchInlineSnapshot(`
    "type AppTabProps = {
      size: string;
    };

    export default function AppTab({ size }: AppTabProps) {
      return <button>{size}</button>;
    }
    "
  `);
});
