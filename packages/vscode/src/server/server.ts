import { renameAll, renameSymbols } from '@ts-rename-all/core';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';

import {
  RenameAllRequestType,
  RenameSymbolsRequestType,
} from '../shared/requests';

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize(() => {
  return {
    capabilities: {},
  };
});

connection.onRequest(RenameSymbolsRequestType, async (params) => {
  const { srcPaths, srcSymbolPattern, destSymbolPattern } = params;
  try {
    await renameSymbols(srcPaths, {
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.onRequest(RenameAllRequestType, async (params) => {
  const { srcPaths, srcSymbolPattern, destSymbolPattern } = params;
  try {
    // todo: before hook for copy
    await renameAll(srcPaths, {
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.listen();
