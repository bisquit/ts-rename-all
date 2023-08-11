import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameFilesRequestParams,
  RenameFilesRequestType,
} from '../../shared/requests';
import { success } from '../utils/success';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameFiles',
    async (uri?: vscode.Uri) => {
      if (!uri) {
        return;
      }

      const srcFileNamePattern = await vscode.window.showInputBox({
        title: 'Type a file name pattarn to rename',
      });

      const destFileNamePattern = await vscode.window.showInputBox({
        title: 'Type a new file name pattarn',
      });

      if (!srcFileNamePattern || !destFileNamePattern) {
        return;
      }

      const params: RenameFilesRequestParams = {
        dirPath: uri.path,
        srcFileNamePattern,
        destFileNamePattern,
      };
      await client.sendRequest(RenameFilesRequestType, params);

      success();
    },
  );
