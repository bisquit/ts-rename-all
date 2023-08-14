import { renameAll, renameFile, renameSymbols } from '@ts-rename-all/core';
import { renameDir } from '@ts-rename-all/core';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';

import {
  RenameAllRequestType,
  RenameDirRequestType,
  RenameFileRequestType,
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
    await renameAll(srcPaths, {
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.onRequest(RenameDirRequestType, async (params) => {
  const { dirPath, destDirName, srcSymbolPattern, destSymbolPattern } = params;
  try {
    await renameDir(dirPath, {
      destDirName: destDirName,
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.onRequest(RenameFileRequestType, async (params) => {
  const { filePath, destFileName, srcSymbolPattern, destSymbolPattern } =
    params;
  try {
    await renameFile(filePath, {
      destFileName: destFileName,
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.listen();
