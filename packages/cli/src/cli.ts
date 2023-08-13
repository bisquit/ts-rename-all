#!/usr/bin/env node

import { cli } from 'cleye';

import { bin, description, version } from '../package.json';
import allCommand from './commands/all.js';
import symbolsCommand from './commands/symbols.js';

const argv = cli(
  {
    name: Object.keys(bin).at(0),

    version: version,

    parameters: ['<srcPath>', '[srcPaths...]'],

    help: {
      description: description,
      examples: ['ts-rename-all src/app-button'],
    },

    commands: [symbolsCommand],
  },
  async (argv) => {
    await allCommand([argv._.srcPath, ...argv._.srcPaths]);
  },
);
