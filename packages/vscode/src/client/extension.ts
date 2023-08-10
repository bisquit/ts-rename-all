import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import * as vscode from 'vscode';
import {
  ExecuteCommandRequest,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('dist', 'server', 'server.js'),
  );

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      // options: {
      //   execArgv: ['--nolazy', '--inspect=6009'],
      // },
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    outputChannelName: 'TS Rename All',
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'tsRenameAll',
    'TS Rename All',
    serverOptions,
    clientOptions,
  );

  // Start the client. This will also launch the server
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

      // TODO: extract pattern

      await client.sendRequest(ExecuteCommandRequest.type, {
        command: 'ts-rename-all.renameSymbols',
        arguments: [
          {
            srcFilePath: filePath,
            srcSymbolPattern: currentSymbolName,
            destSymbolPattern: destSymbolName,
          },
        ],
      });
    }),
    vscode.commands.registerCommand(
      'ts-rename-all.renameAll',
      async (uri?: vscode.Uri) => {
        console.log('uri', uri);

        await client.sendRequest(ExecuteCommandRequest.type, {
          command: 'ts-rename-all.sample',
          arguments: [uri],
        });
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
