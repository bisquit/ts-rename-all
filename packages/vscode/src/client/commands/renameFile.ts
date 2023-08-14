import { getPathComponents } from '@ts-rename-all/shared';
import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameFileRequestParams,
  RenameFileRequestType,
} from '../../shared/requests';
import { catchError } from '../utils/catchError';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateChanged } from '../utils/validateChanged';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  async (_: unknown, argUris?: vscode.Uri[]) => {
    await catchError(async () => {
      if (!argUris) {
        return;
      }

      // pick first one (same as built-in `Rename` does)
      const uri = argUris[0];

      const filePath = uri.path;
      const { filename, name } = getPathComponents(filePath);

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

      // trim ' copy', which is added by vscode
      // this is an arbitrary manipulation, but it is common usecase that a user copies a directory and rename it.
      const srcSymbolPattern = name.replace(/ copy/, '');
      const destSymbolPattern = getPathComponents(destFileName).name;

      await progress('Renaming...', async () => {
        const params: RenameFileRequestParams = {
          filePath,
          destFileName,
          srcSymbolPattern,
          destSymbolPattern,
        };
        const error = await client.sendRequest(RenameFileRequestType, params);
        if (error) {
          throw new Error(error);
        }
      });

      await success();
    });
  };
