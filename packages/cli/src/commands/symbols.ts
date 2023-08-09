import { outro } from '@clack/prompts';
import { renameSymbols } from '@ts-rename-all/core';
import { command } from 'cleye';
import colors from 'picocolors';

export default command(
  {
    name: 'symbols',
    parameters: ['<srcFilePath>', '<srcSymbolPattern>', '<destSymbolPattern>'],
  },
  async (argv) => {
    console.log(argv);

    await renameSymbols(argv._.srcFilePath, {
      srcSymbolPattern: argv._.srcSymbolPattern,
      destSymbolPattern: argv._.destSymbolPattern,
    });

    outro(colors.cyan('✔ Successfully renamed.'));
  },
);
