import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameAllRequestParams,
  RenameAllRequestType,
} from '../../shared/requests';
import { catchError } from '../utils/catchError';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  async (_: unknown, argUris?: vscode.Uri[]) => {
    await catchError(async () => {
      if (!argUris) {
        return;
      }

      const srcPaths = argUris.map((uri) => uri.path);

      const srcSymbolPattern = await vscode.window.showInputBox({
        prompt: 'Type a symbol pattarn to rename',
        validateInput: (value) => {
          return validateRequired(value);
        },
      });
      if (!srcSymbolPattern) {
        return;
      }

      const destSymbolPattern = await vscode.window.showInputBox({
        prompt: `Rename ${srcSymbolPattern} to...`,
        value: srcSymbolPattern,
        validateInput: (value) => {
          return validateRequired(value);
        },
      });
      if (!destSymbolPattern) {
        return;
      }

      await progress('Renaming...', async () => {
        const params: RenameAllRequestParams = {
          srcPaths: srcPaths,
          srcSymbolPattern: srcSymbolPattern,
          destSymbolPattern: destSymbolPattern,
        };
        const error = await client.sendRequest(RenameAllRequestType, params);
        if (error) {
          throw new Error(error);
        }
      });

      await success();
    });
  };
