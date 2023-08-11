import * as path from 'node:path';

import * as vscode from 'vscode';
import {
  ExecuteCommandRequest,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

import {
  RenameSymbolsRequestParams,
  RenameSymbolsRequestType,
} from '../shared/requests';
import { success } from './utils';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join('dist', 'server', 'server.js'),
  );

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
    },
  };

  const clientOptions: LanguageClientOptions = {
    outputChannelName: 'TS Rename All',
  };

  client = new LanguageClient(
    'tsRenameAll',
    'TS Rename All',
    serverOptions,
    clientOptions,
  );

  await client.start();

  context.subscriptions.push(
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
        title: 'Type new name',
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
    }),
    vscode.commands.registerCommand(
      'ts-rename-all.renameFile',
      async (uri?: vscode.Uri) => {
        console.log('uri', uri);

        // await client.sendRequest(ExecuteCommandRequest.type, {
        //   command: 'ts-rename-all.sample',
        //   arguments: [uri],
        // });
      },
    ),
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
