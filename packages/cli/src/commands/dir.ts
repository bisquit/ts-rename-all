import { text } from '@clack/prompts';
import { renameDir } from '@ts-rename-all/core';
import { getPathComponents } from '@ts-rename-all/shared';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { catchError } from '../utils/catchError.js';
import { checkFsExists } from '../utils/checkFsExists.js';
import { checkFsIsDirectory } from '../utils/checkFsIsDirectory.js';
import { progress } from '../utils/progress.js';
import { success } from '../utils/success.js';
import { validateChanged } from '../utils/validateChanged.js';
import { validateRequired } from '../utils/validateRequired.js';

export default command(
  {
    name: 'dir',
    parameters: ['<srcDirPath>', '[destDirName]'],
    help: {
      description: 'Rename a directory name and all symbols in the file.',
      examples: ['ts-rename-all dir src/app-button'],
    },
  },
  async (argv) => {
    await catchError(async () => {
      const srcDirPath = argv._.srcDirPath;
      await checkFsExists(srcDirPath);
      await checkFsIsDirectory(srcDirPath);

      const { filename: dirname } = getPathComponents(srcDirPath);

      const destDirName =
        argv._.destDirName ??
        (await cancellable(
          text({
            message: 'Type a new directory name',
            initialValue: dirname,
            validate: (value) => {
              return validateRequired(value) || validateChanged(value, dirname);
            },
          }),
        ));

      await progress(
        'Renaming...',
        async () => {
          await renameDir(srcDirPath, {
            destDirName: destDirName,
          });
        },
        `Renamed ${dirname} => ${destDirName}`,
      );

      await success();
    });
  },
);
