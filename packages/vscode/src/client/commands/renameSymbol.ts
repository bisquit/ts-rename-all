import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameSymbolsRequestParams,
  RenameSymbolsRequestType,
} from '../../shared/requests';
import { catchError } from '../utils/catchError';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand('ts-rename-all.renameSymbols', async () => {
    await catchError(async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const filePath = editor.document.uri.path;

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
        const params: RenameSymbolsRequestParams = {
          srcFilePath: filePath,
          srcSymbolPattern: srcSymbolPattern,
          destSymbolPattern: destSymbolPattern,
        };
        const error = await client.sendRequest(
          RenameSymbolsRequestType,
          params,
        );
        if (error) {
          throw new Error(error);
        }
      });

      await success();
    });
  });
