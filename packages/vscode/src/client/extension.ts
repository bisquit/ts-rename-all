import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import renameDirCommand from './commands/renameDir';
import renameSymbolsCommand from './commands/renameFile';
import renameFilesCommand from './commands/renameFiles';
import renameFileCommand from './commands/renameSymbol';
import { startLanguageClient } from './languageClient';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  client = await startLanguageClient(context);

  context.subscriptions.push(
    renameSymbolsCommand(client),
    renameFileCommand(client),
    renameFilesCommand(client),
    renameDirCommand(client),
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
