import { text } from '@clack/prompts';
import { renameFiles } from '@ts-rename-all/core';
import { command } from 'cleye';

import { cancellable } from '../utils/cancellable.js';
import { success } from '../utils/success.js';

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
    const srcFileNamePattern =
      argv._.srcFileNamePattern ??
      (await cancellable(
        text({
          message: 'Type a file name pattarn to rename',
        }),
      ));

    const destFileNamePattern =
      argv._.destFileNamePattern ??
      (await cancellable(
        text({
          message: 'Type a new file name pattarn',
        }),
      ));

    await renameFiles(argv._.dirPath, {
      srcFileNamePattern: srcFileNamePattern,
      destFileNamePattern: destFileNamePattern,
    });

    success();
  },
);
