#!/usr/bin/env node

import { resolve } from 'node:path';

import { intro, outro, text } from '@clack/prompts';
import { pascalCase } from 'change-case';
import { cli } from 'cleye';
import colors from 'picocolors';

import pkg from '../package.json';
import { replicateDir } from './core/replicateDir.js';
import { getPathComponents } from './utils/get-path-components.js';

const argv = cli({
  name: 'tsrep',

  version: pkg.version,

  parameters: ['<srcDirPath>'],

  flags: {},

  help: {
    description: pkg.description,
    examples: ['tsrep src/app-button'],
  },
});

const srcDirPath = argv._.srcDirPath;

const { filename: dirname } = getPathComponents(srcDirPath);

intro('tsrep - TypeScript Replicator');

const destDirName = String(
  await text({
    message: 'Type new directory name',
    initialValue: dirname,
    validate: (value) => {
      if (value === dirname) {
        return 'Please enter a new directory name';
      }
      if (value.length === 0) {
        return 'Please enter a directory name';
      }
    },
  }),
);

const srcSymbol = pascalCase(dirname);
const destSymbol = pascalCase(destDirName);

await replicateDir(resolve(process.cwd(), srcDirPath), {
  destDirName,
  srcSymbol,
  destSymbol,
});

outro(colors.cyan('✔ Successfully replicated.'));
