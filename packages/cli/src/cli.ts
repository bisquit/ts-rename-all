#!/usr/bin/env node

import { resolve } from 'node:path';

import { intro, outro, text } from '@clack/prompts';
import { getPathComponents } from '@ts-rename-all/shared';
import { pascalCase } from 'change-case';
import { cli } from 'cleye';
import colors from 'picocolors';

import { description, name, version } from '../package.json';
import symbolsCommand from './commands/symbols.js';

const argv = cli({
  name: name,

  version: version,

  parameters: ['<srcDirPath>'],

  flags: {},

  help: {
    description: description,
    examples: ['tsrep src/app-button'],
  },

  commands: [symbolsCommand],
});

// const srcDirPath = argv._.srcDirPath;

// const { filename: dirname } = getPathComponents(srcDirPath);

// const destDirName = String(
//   await text({
//     message: 'Type new directory name',
//     initialValue: dirname,
//     validate: (value) => {
//       if (value === dirname) {
//         return 'Please enter a new directory name';
//       }
//       if (value.length === 0) {
//         return 'Please enter a directory name';
//       }
//     },
//   }),
// );

// const srcSymbol = pascalCase(dirname);
// const destSymbol = pascalCase(destDirName);

// await replaceDir(resolve(process.cwd(), srcDirPath), {
//   destDirName,
//   srcSymbol,
//   destSymbol,
// });

// outro(colors.cyan('✔ Successfully replaced.'));
