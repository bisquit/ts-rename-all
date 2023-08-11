import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import {
  RenameSymbolsRequestParams,
  RenameSymbolsRequestType,
} from '../../shared/requests';
import { success } from '../utils/success';

export default (client: LanguageClient) =>
  vscode.commands.registerCommand('ts-rename-all.renameSymbols', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const filePath = editor.document.uri.path;

    const currentPosition = editor.selection.active;
    const currentSymbolName = currentPosition
      ? editor.document.getText(
          editor.document.getWordRangeAtPosition(currentPosition),
        )
      : '';

    const destSymbolName = await vscode.window.showInputBox({
      title: 'Type a new name',
      value: currentSymbolName,
    });

    if (!destSymbolName || destSymbolName === currentSymbolName) {
      return;
    }

    // TODO: extract pattern

    const params: RenameSymbolsRequestParams = {
      srcFilePath: filePath,
      srcSymbolPattern: currentSymbolName,
      destSymbolPattern: destSymbolName,
    };
    await client.sendRequest(RenameSymbolsRequestType, params);

    success();
  });
