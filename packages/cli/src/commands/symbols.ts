import { text } from '@clack/prompts';
import { renameSymbols } from '@ts-rename-all/core';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { success } from '../utils/success.js';

export default command(
  {
    name: 'symbols',
    parameters: ['<srcFilePath>', '[srcSymbolPattern]', '[destSymbolPattern]'],
    help: {
      description: 'Rename all symbols in a file.',
      examples: ['ts-rename-all symbols src/index.ts Foo Bar'],
    },
  },
  async (argv) => {
    const srcSymbolPattern =
      argv._.srcSymbolPattern ??
      (await cancellable(
        text({
          message: 'Type a symbol pattarn to rename',
        }),
      ));

    const destSymbolPattern =
      argv._.destSymbolPattern ??
      (await cancellable(
        text({
          message: 'Type a new symbol pattarn',
        }),
      ));

    await renameSymbols(argv._.srcFilePath, {
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });

    success();
  },
);
