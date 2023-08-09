import { outro } from '@clack/prompts';
import { renameSymbols } from '@ts-rename-all/core';
import { debug } from '@ts-rename-all/shared';
import { command } from 'cleye';
import colors from 'picocolors';

export default command(
  {
    name: 'symbols',
    parameters: ['<srcFilePath>', '<srcSymbolPattern>', '<destSymbolPattern>'],
    help: {
      description: 'Rename all symbols in a file.',
      examples: ['ts-rename-all symbols src/index.ts Foo Bar'],
    },
  },
  async (argv) => {
    debug('argv', argv);

    await renameSymbols(argv._.srcFilePath, {
      srcSymbolPattern: argv._.srcSymbolPattern,
      destSymbolPattern: argv._.destSymbolPattern,
    });

    outro(colors.cyan('✔ Successfully renamed.'));
  },
);
