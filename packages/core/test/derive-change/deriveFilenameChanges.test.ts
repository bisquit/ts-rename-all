import { describe, expect, test } from 'vitest';

import { deriveFilenameChanges } from '../../src/derive-change/deriveFilenameChanges.js';

describe('deriveFilenameChanges', () => {
  test.each([
    {
      before: 'Button',
      after: 'Tab',
      expected: [
        { before: 'Button', after: 'Tab' },
        { before: 'button', after: 'tab' },
      ],
    },
    {
      before: 'inline-button',
      after: 'block-tab',
      expected: [
        { before: 'InlineButton', after: 'BlockTab' },
        { before: 'inlineButton', after: 'blockTab' },
        { before: 'inline-button', after: 'block-tab' },
        { before: 'inline_button', after: 'block_tab' },
      ],
    },
  ])('($before, $after)', ({ before, after, expected }) => {
    expect(deriveFilenameChanges({ before, after })).toEqual(expected);
  });
});
