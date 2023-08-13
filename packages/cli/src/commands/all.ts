import { text } from '@clack/prompts';
import { renameAll, renameSymbols } from '@ts-rename-all/core';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { catchError } from '../utils/catchError.js';
import { checkFsExists } from '../utils/checkFsExists.js';
import { progress } from '../utils/progress.js';
import { success } from '../utils/success.js';
import { validateRequired } from '../utils/validateRequired.js';

export default async (srcPaths: string[]) => {
  await catchError(async () => {
    const srcSymbolPattern = await cancellable(
      text({
        message: 'Type a symbol pattarn to rename',
        validate: (value) => {
          return validateRequired(value);
        },
      }),
    );

    const destSymbolPattern = await cancellable(
      text({
        message: 'Type a new symbol pattarn',
        validate: (value) => {
          return validateRequired(value);
        },
      }),
    );

    await progress(
      'Renaming...',
      async () => {
        await renameAll(srcPaths, {
          srcSymbolPattern: srcSymbolPattern,
          destSymbolPattern: destSymbolPattern,
        });
      },
      `Renamed ${srcSymbolPattern} => ${destSymbolPattern}`,
    );

    await success();
  });
};
