import { renameSymbols } from '@ts-rename-all/core';
import * as vscode from 'vscode';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

connection.onInitialize(() => {
  return {
    capabilities: {},
  };
});

connection.onExecuteCommand(async (params) => {
  console.log('onExecuteCommand', params);

  if (params.command === 'ts-rename-all.renameSymbols') {
    const arg = params.arguments?.at(0) as {
      srcFilePath: string;
      srcSymbolPattern: string;
      destSymbolPattern: string;
    };
    console.log('arg', arg);

    await renameSymbols(arg.srcFilePath, {
      srcSymbolPattern: arg.srcSymbolPattern,
      destSymbolPattern: arg.destSymbolPattern,
    });
  }

  if (params.command === 'ts-rename-all.sample') {
    const arg = params.arguments?.at(0) as vscode.Uri;
    console.log('arg', arg);
  }
});

// Listen on the connection
connection.listen();