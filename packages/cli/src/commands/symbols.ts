import { text } from '@clack/prompts';
import { renameSymbols } from '@ts-rename-all/core';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { catchError } from '../utils/catchError.js';
import { checkFsExists } from '../utils/checkFsExists.js';
import { progress } from '../utils/progress.js';
import { success } from '../utils/success.js';
import { validateRequired } from '../utils/validateRequired.js';

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
    await catchError(async () => {
      const srcFilePath = argv._.srcFilePath;
      await checkFsExists(srcFilePath);

      const srcSymbolPattern =
        argv._.srcSymbolPattern ??
        (await cancellable(
          text({
            message: 'Type a symbol pattarn to rename',
            validate: (value) => {
              return validateRequired(value);
            },
          }),
        ));

      const destSymbolPattern =
        argv._.destSymbolPattern ??
        (await cancellable(
          text({
            message: 'Type a new symbol pattarn',
            validate: (value) => {
              return validateRequired(value);
            },
          }),
        ));

      await progress(
        'Renaming...',
        async () => {
          await renameSymbols(argv._.srcFilePath, {
            srcSymbolPattern: srcSymbolPattern,
            destSymbolPattern: destSymbolPattern,
          });
        },
        `Renamed ${srcSymbolPattern} => ${destSymbolPattern}`,
      );

      await success();
    });
  },
);
