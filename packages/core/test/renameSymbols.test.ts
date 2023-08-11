import { readFile } from 'node:fs/promises';
import { describe } from 'node:test';

import { beforeEach, expect, test } from 'vitest';

import { renameSymbols } from '../src/index.js';
import { setupFixture } from './test-utils.js';

const { resetDir, copyFixture, resolveFixturePath } = await setupFixture(
  import.meta,
);

beforeEach(async () => {
  await resetDir();
  await copyFixture('AppButton.tsx');
});

describe('renameSymbols', () => {
  test('Button => Tab', async () => {
    await renameSymbols(resolveFixturePath('AppButton.tsx'), {
      srcSymbolPattern: 'Button',
      destSymbolPattern: 'Tab',
    });

    const content = await readFile(
      resolveFixturePath('AppButton.tsx'),
      'utf-8',
    );
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

  test('Button => InlineButton', async () => {
    await renameSymbols(resolveFixturePath('AppButton.tsx'), {
      srcSymbolPattern: 'Button',
      destSymbolPattern: 'InlineButton',
    });

    const content = await readFile(
      resolveFixturePath('AppButton.tsx'),
      'utf-8',
    );
    expect(content).toMatchInlineSnapshot(`
      "const APP_INLINE_BUTTON_SIZES = ['small', 'medium', 'large'] as const;

      type AppInlineButtonProps = {
        size: (typeof APP_INLINE_BUTTON_SIZES)[number];
      };

      export default function AppInlineButton({ size }: AppInlineButtonProps) {
        return <button>{size}</button>;
      }
      "
    `);
  });
});
