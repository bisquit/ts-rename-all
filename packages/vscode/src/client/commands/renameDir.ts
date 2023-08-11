import { getPathComponents } from '@ts-rename-all/shared';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameDirRequestParams,
  RenameDirRequestType,
} from '../../shared/requests';
import { success } from '../utils/success';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameDir',
    async (uri?: vscode.Uri) => {
      if (!uri) {
        return;
      }

      const { filename: dirname } = getPathComponents(uri.path);

      const destDirName = await vscode.window.showInputBox({
        title: 'Type a new directory name',
        value: dirname,
      });

      if (!destDirName) {
        return;
      }

      const params: RenameDirRequestParams = {
        srcDirPath: uri.path,
        destDirName,
        srcDirName: dirname,
      };
      await client.sendRequest(RenameDirRequestType, params);

      success();
    },
  );
