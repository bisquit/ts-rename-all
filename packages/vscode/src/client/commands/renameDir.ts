import { getPathComponents } from '@ts-rename-all/shared';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameDirRequestParams,
  RenameDirRequestType,
} from '../../shared/requests';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateChanged } from '../utils/validateChanged';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameDir',
    async (uri?: vscode.Uri) => {
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

      await progress('Renaming...', async () => {
        const params: RenameDirRequestParams = {
          srcDirPath: uri.path,
          destDirName,
          srcDirName: dirname,
        };
        await client.sendRequest(RenameDirRequestType, params);
      });

      await success();
    },
  );
