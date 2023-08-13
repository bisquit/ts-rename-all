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
  await copyFixture('Foo.ts');
});

describe('renameSymbols', () => {
  test('Foo => Bar', async () => {
    await renameSymbols(resolveFixturePath('Foo.ts'), {
      srcSymbolPattern: 'Foo',
      destSymbolPattern: 'Bar',
    });

    const content = await readFile(resolveFixturePath('Foo.ts'), 'utf-8');

    // check Foo renamed to Bar, and Hoo not renamed

    expect(content).toMatch('class Bar {');
    expect(content).toMatch('class Hoo {');

    expect(content).toMatch('enum BarEnum {');
    expect(content).toMatch('enum HooEnum {');

    expect(content).toMatch('function bar(');
    expect(content).toMatch('function hoo(');

    expect(content).toMatch('interface BarInterface {');
    expect(content).toMatch('interface HooInterface {');

    expect(content).toMatch('module BarModule {');
    expect(content).toMatch('module HooModule {');
    expect(content).toMatch('namespace BarNamespace {');
    expect(content).toMatch('namespace HooNamespace {');

    expect(content).toMatch('type BarType =');
    expect(content).toMatch('type HooType =');

    expect(content).toMatch('const barConst =');
    expect(content).toMatch('const hooConst =');
    expect(content).toMatch('let barLet =');
    expect(content).toMatch('let hooLet =');
    expect(content).toMatch('var barVar =');
    expect(content).toMatch('var hooVar =');
  });
});
