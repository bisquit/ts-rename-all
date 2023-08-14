import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/node';

import renameAllCommand from './commands/renameAll';
import renameDirCommand from './commands/renameDir';
import renameFileCommand from './commands/renameFile';
import renameSymbolsCommand from './commands/renameSymbols';
import { startLanguageClient } from './languageClient';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  client = await startLanguageClient(context);

  context.subscriptions.push(
    // commands
    vscode.commands.registerCommand(
      'ts-rename-all.renameSymbols',
      renameSymbolsCommand(client),
    ),
    vscode.commands.registerCommand(
      'ts-rename-all.renameAll',
      renameAllCommand(client),
    ),
    // menu commands
    vscode.commands.registerCommand(
      'ts-rename-all.menu.renameDir',
      renameDirCommand(client),
    ),
    vscode.commands.registerCommand(
      'ts-rename-all.menu.renameFile',
      renameFileCommand(client),
    ),
    vscode.commands.registerCommand(
      'ts-rename-all.menu.renameSymbols',
      renameSymbolsCommand(client),
    ),
    vscode.commands.registerCommand(
      'ts-rename-all.menu.renameAll',
      renameAllCommand(client),
    ),
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
