import { existsSync } from 'node:fs';
import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { beforeEach, expect, test } from 'vitest';

import { renameFiles } from '../src/renameFiles.js';

const testDir = resolve('test-tmp', basename(import.meta.url));

beforeEach(async () => {
  if (existsSync(testDir)) {
    await rm(testDir, { recursive: true, force: true });
  }
  await mkdir(testDir, { recursive: true });

  await cp(
    resolve('../../fixtures/app-button'),
    resolve(testDir, 'app-button'),
    {
      force: true,
      recursive: true,
    },
  );
});

test('renameFiles', async () => {
  await renameFiles(resolve(testDir, 'app-button'), {
    srcFileNamePattern: 'Button',
    destFileNamePattern: 'Tab',
  });

  expect(existsSync(resolve(testDir, 'app-button', 'AppTab.tsx'))).toBe(true);
  expect(existsSync(resolve(testDir, 'app-button', 'AppTabContext.tsx'))).toBe(
    true,
  );
  expect(existsSync(resolve(testDir, 'app-button', 'useAppTab.tsx'))).toBe(
    true,
  );

  expect(
    await readFile(resolve(testDir, 'app-button', 'AppTab.tsx'), 'utf-8'),
  ).toMatchInlineSnapshot(`
    "import { useContext } from 'react';

    import { AppTabContext } from './AppTabContext';

    type AppTabProps = {
      size?: string;
    };

    export default function AppTab({ size }: AppTabProps) {
      const context = useContext(AppTabContext);
      return <button {...context}>{size}</button>;
    }
    "
  `);
  expect(
    await readFile(
      resolve(testDir, 'app-button', 'AppTabContext.tsx'),
      'utf-8',
    ),
  ).toMatchInlineSnapshot(`
    "import { createContext } from 'react';

    type AppTabContextValue = {
      title?: string;
    };

    export const AppTabContext = createContext<AppTabContextValue>({});
    "
  `);
  expect(
    await readFile(resolve(testDir, 'app-button', 'useAppTab.tsx'), 'utf-8'),
  ).toMatchInlineSnapshot(`
    "import AppTab from './AppTab';

    export default function useAppTab() {
      return {
        component: <AppTab />,
      };
    }
    "
  `);
});
