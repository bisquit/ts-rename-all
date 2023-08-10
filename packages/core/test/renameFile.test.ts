import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { beforeEach, expect, test } from 'vitest';

import { renameFile } from '../src/renameFile.js';

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

test('renameFile', async () => {
  await renameFile(resolve(testDir, 'AppButton.tsx'), {
    destFileName: 'AppTab.tsx',
  });

  expect(existsSync(resolve(testDir, 'AppTab.tsx'))).toBe(true);

  const content = await readFile(resolve(testDir, 'AppTab.tsx'), 'utf-8');
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
