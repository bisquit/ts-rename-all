import { renameSymbols } from '@ts-rename-all/core';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';

import { RenameSymbolsRequestType } from '../shared/requests';

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize(() => {
  return {
    capabilities: {},
  };
});

connection.onRequest(RenameSymbolsRequestType, async (params) => {
  const { srcFilePath, srcSymbolPattern, destSymbolPattern } = params;
  await renameSymbols(srcFilePath, {
    srcSymbolPattern: srcSymbolPattern,
    destSymbolPattern: destSymbolPattern,
  });
});

connection.listen();
