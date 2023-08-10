import { text } from '@clack/prompts';
import { renameDir } from '@ts-rename-all/core';
import { getPathComponents } from '@ts-rename-all/shared';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { success } from '../utils/success.js';

export default command(
  {
    name: 'dir',
    parameters: ['<srcDirPath>', '[destDirName]'],
    help: {
      description: 'Rename a file name and all symbols in the file.',
      examples: ['ts-rename-all file src/AppButton.tsx'],
    },
  },
  async (argv) => {
    const { filename: dirname } = getPathComponents(argv._.srcDirPath);

    const destDirName =
      argv._.destDirName ??
      (await cancellable(
        text({
          message: 'Type a new directory name',
          initialValue: dirname,
          validate: (value) => {
            if (value === '') {
              return 'Directory name is required.';
            }
            if (value === dirname) {
              return 'Directory name is not changed.';
            }
          },
        }),
      ));

    await renameDir(argv._.srcDirPath, {
      destDirName: destDirName,
    });

    success();
  },
);
