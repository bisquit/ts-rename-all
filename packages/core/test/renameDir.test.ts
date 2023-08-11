import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

import { beforeEach, expect, test } from 'vitest';

import { renameDir } from '../src/index.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('app-button');
});

test('renameDir', async () => {
  await renameDir(resolveFixturePath('app-button'), {
    destDirName: 'app-tab',
  });

  expect(existsSync(resolveFixturePath('app-tab', 'AppTab.tsx'))).toBe(true);
  expect(existsSync(resolveFixturePath('app-tab', 'AppTabContext.tsx'))).toBe(
    true,
  );
  expect(existsSync(resolveFixturePath('app-tab', 'useAppTab.tsx'))).toBe(true);

  expect(await readFile(resolveFixturePath('app-tab', 'AppTab.tsx'), 'utf-8'))
    .toMatchInlineSnapshot(`
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
    await readFile(resolveFixturePath('app-tab', 'AppTabContext.tsx'), 'utf-8'),
  ).toMatchInlineSnapshot(`
    "import { createContext } from 'react';

    type AppTabContextValue = {
      title?: string;
    };

    export const AppTabContext = createContext<AppTabContextValue>({});
    "
  `);
  expect(
    await readFile(resolveFixturePath('app-tab', 'useAppTab.tsx'), 'utf-8'),
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
