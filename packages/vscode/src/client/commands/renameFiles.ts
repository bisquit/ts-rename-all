import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameFilesRequestParams,
  RenameFilesRequestType,
} from '../../shared/requests';
import { catchError } from '../utils/catchError';
import { progress } from '../utils/progress';
import { success } from '../utils/success';
import { validateRequired } from '../utils/validateRequired';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand(
    'ts-rename-all.renameFiles',
    async (uri?: vscode.Uri) => {
      await catchError(async () => {
        if (!uri) {
          return;
        }

        const srcFileNamePattern = await vscode.window.showInputBox({
          prompt: 'Type a filename pattarn to rename',
          validateInput: (value) => {
            return validateRequired(value);
          },
        });
        if (!srcFileNamePattern) {
          return;
        }

        const destFileNamePattern = await vscode.window.showInputBox({
          prompt: `Rename ${srcFileNamePattern} to...`,
          value: srcFileNamePattern,
          validateInput: (value) => {
            return validateRequired(value);
          },
        });
        if (!destFileNamePattern) {
          return;
        }

        await progress('Renaming...', async () => {
          const params: RenameFilesRequestParams = {
            dirPath: uri.path,
            srcFileNamePattern,
            destFileNamePattern,
          };
          const error = await client.sendRequest(
            RenameFilesRequestType,
            params,
          );
          if (error) {
            throw new Error(error);
          }
        });

        await success();
      });
    },
  );
