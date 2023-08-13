import { text } from '@clack/prompts';
import { renameFiles } from '@ts-rename-all/core';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { catchError } from '../utils/catchError.js';
import { checkFsExists } from '../utils/checkFsExists.js';
import { checkFsIsDirectory } from '../utils/checkFsIsDirectory.js';
import { progress } from '../utils/progress.js';
import { success } from '../utils/success.js';
import { validateRequired } from '../utils/validateRequired.js';

export default command(
  {
    name: 'files',
    parameters: ['<dirPath>', '[srcFileNamePattern]', '[destFileNamePattern]'],
    help: {
      description:
        'Rename all files in a directory and all symbols in the files.',
      examples: ['ts-rename-all files src/app-button'],
    },
  },
  async (argv) => {
    await catchError(async () => {
      const srcDirPath = argv._.dirPath;
      await checkFsExists(srcDirPath);
      await checkFsIsDirectory(srcDirPath);

      const srcFileNamePattern =
        argv._.srcFileNamePattern ??
        (await cancellable(
          text({
            message: 'Type a file name pattarn to rename',
            validate: (value) => {
              return validateRequired(value);
            },
          }),
        ));

      const destFileNamePattern =
        argv._.destFileNamePattern ??
        (await cancellable(
          text({
            message: 'Type a new file name pattarn',
            validate: (value) => {
              return validateRequired(value);
            },
          }),
        ));

      await progress(
        'Renaming...',
        async () => {
          await renameFiles(srcDirPath, {
            srcFileNamePattern: srcFileNamePattern,
            destFileNamePattern: destFileNamePattern,
          });
        },
        `Renamed ${srcFileNamePattern} => ${destFileNamePattern}`,
      );

      await success();
    });
  },
);
