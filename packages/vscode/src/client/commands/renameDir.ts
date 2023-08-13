import { getPathComponents } from '@ts-rename-all/shared';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameDirRequestParams,
  RenameDirRequestType,
} from '../../shared/requests';
import { catchError } from '../utils/catchError';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateChanged } from '../utils/validateChanged';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameDir',
    async (uri?: vscode.Uri) => {
      await catchError(async () => {
        if (!uri) {
          return;
        }

        const { filename: dirname } = getPathComponents(uri.path);

        const destDirName = await vscode.window.showInputBox({
          prompt: 'Type a new directory name',
          value: dirname,
          validateInput: (value) => {
            return validateRequired(value) || validateChanged(value, dirname);
          },
        });
        if (!destDirName) {
          return;
        }

        // trim ' copy', which is added by vscode
        // this is an arbitrary manipulation, but it is common usecase that a user copies a directory and rename it.
        const srcDirName = dirname.replace(/ copy/, '');

        await progress('Renaming...', async () => {
          const params: RenameDirRequestParams = {
            srcDirPath: uri.path,
            destDirName,
            srcDirName: srcDirName,
          };
          const error = await client.sendRequest(RenameDirRequestType, params);
          if (error) {
            throw new Error(error);
          }
        });

        await success();
      });
    },
  );
