#!/usr/bin/env node

import { cli } from 'cleye';

import { bin, description, version } from '../package.json';
import dirCommand from './commands/dir.js';
import fileCommand from './commands/file.js';
import filesCommand from './commands/files.js';
import symbolsCommand from './commands/symbols.js';

const argv = cli({
  name: Object.keys(bin).at(0),

  version: version,

  parameters: ['<command>'],

  help: {
    description: description,
  },

  commands: [symbolsCommand, fileCommand, filesCommand, dirCommand],
});
