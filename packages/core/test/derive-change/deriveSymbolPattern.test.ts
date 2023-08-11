import { describe, expect, test } from 'vitest';

import { deriveSymbolChanges } from '../../src/derive-change/deriveSymbolChanges.js';

describe('deriveSymbolChanges', () => {
  test.each([
    {
      before: 'Button',
      after: 'Tab',
      expected: [
        { before: 'Button', after: 'Tab' },
        { before: 'button', after: 'tab' },
        { before: 'BUTTON', after: 'TAB' },
      ],
    },
    {
      before: 'AppButton',
      after: 'AppTab',
      expected: [
        { before: 'AppButton', after: 'AppTab' },
        { before: 'appButton', after: 'appTab' },
        { before: 'APP_BUTTON', after: 'APP_TAB' },
      ],
    },
    {
      before: 'getId',
      after: 'getUserId',
      expected: [
        { before: 'GetId', after: 'GetUserId' },
        { before: 'getId', after: 'getUserId' },
        { before: 'GET_ID', after: 'GET_USER_ID' },
      ],
    },
  ])('($before, $after)', ({ before, after, expected }) => {
    expect(deriveSymbolChanges(before, after)).toEqual(expected);
  });
});
