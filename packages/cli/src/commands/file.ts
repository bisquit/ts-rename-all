import { text } from '@clack/prompts';
import { renameFile } from '@ts-rename-all/core';
import { getPathComponents } from '@ts-rename-all/shared';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { catchError } from '../utils/catchError.js';
import { checkFsExists } from '../utils/checkFsExists.js';
import { progress } from '../utils/progress.js';
import { success } from '../utils/success.js';
import { validateChanged } from '../utils/validateChanged.js';
import { validateRequired } from '../utils/validateRequired.js';

export default command(
  {
    name: 'file',
    parameters: ['<srcFilePath>', '[destFileName]'],
    help: {
      description: 'Rename a file name and all symbols in the file.',
      examples: ['ts-rename-all file src/AppButton.tsx'],
    },
  },
  async (argv) => {
    await catchError(async () => {
      const srcFilePath = argv._.srcFilePath;
      await checkFsExists(srcFilePath);

      const { filename: srcFileName } = getPathComponents(argv._.srcFilePath);

      const destFileName =
        argv._.destFileName ??
        (await cancellable(
          text({
            message: 'Type a new file name',
            initialValue: srcFileName,
            validate: (value) => {
              return (
                validateRequired(value) || validateChanged(value, srcFileName)
              );
            },
          }),
        ));

      await progress(
        'Renaming...',
        async () => {
          await renameFile(argv._.srcFilePath, {
            destFileName: destFileName,
          });
        },
        `Renamed ${srcFileName} => ${destFileName}`,
      );

      await success();
    });
  },
);
