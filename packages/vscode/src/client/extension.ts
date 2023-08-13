import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import renameAllCommand from './commands/renameAll';
import renameSymbolsCommand from './commands/renameSymbols';
import { startLanguageClient } from './languageClient';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  client = await startLanguageClient(context);

  context.subscriptions.push(
    renameSymbolsCommand(client),
    renameAllCommand(client),
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
