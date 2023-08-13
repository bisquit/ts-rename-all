import { getPathComponents } from '@ts-rename-all/shared';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameFileRequestParams,
  RenameFileRequestType,
} from '../../shared/requests';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateChanged } from '../utils/validateChanged';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameFile',
    async (uri?: vscode.Uri) => {
      if (!uri) {
        return;
      }

      const { filename, name } = getPathComponents(uri.path);

      const destFileName = await vscode.window.showInputBox({
        prompt: 'Type a new file name',
        value: filename,
        valueSelection: [0, name.length],
        validateInput: (value) => {
          return validateRequired(value) || validateChanged(value, filename);
        },
      });
      if (!destFileName) {
        return;
      }

      await progress('Renaming...', async () => {
        const params: RenameFileRequestParams = {
          srcFilePath: uri.path,
          destFileName: destFileName,
          srcFileName: filename,
        };
        await client.sendRequest(RenameFileRequestType, params);
      });

      await success();
    },
  );
