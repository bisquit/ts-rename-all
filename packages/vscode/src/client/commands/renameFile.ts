import { getPathComponents } from '@ts-rename-all/shared';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameFileRequestParams,
  RenameFileRequestType,
} from '../../shared/requests';
import { success } from '../utils/success';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameFile',
    async (uri?: vscode.Uri) => {
      if (!uri) {
        return;
      }

      const { filename } = getPathComponents(uri.path);

      const destFileName = await vscode.window.showInputBox({
        title: 'Type a new file name',
        value: filename,
      });

      if (!destFileName) {
        return;
      }

      const params: RenameFileRequestParams = {
        srcFilePath: uri.path,
        destFileName: destFileName,
        srcFileName: filename,
      };
      await client.sendRequest(RenameFileRequestType, params);

      success();
    },
  );
