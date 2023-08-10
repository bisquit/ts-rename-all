import { text } from '@clack/prompts';
import { renameFile } from '@ts-rename-all/core';
import { getPathComponents } from '@ts-rename-all/shared';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { success } from '../utils/success.js';

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
    const { filename } = getPathComponents(argv._.srcFilePath);

    const destFileName =
      argv._.destFileName ??
      (await cancellable(
        text({
          message: 'Type a new file name',
          initialValue: filename,
          validate: (value) => {
            if (value === '') {
              return 'File name is required.';
            }
            if (value === filename) {
              return 'File name is not changed.';
            }
          },
        }),
      ));

    await renameFile(argv._.srcFilePath, {
      destFileName: destFileName,
    });

    success();
  },
);
