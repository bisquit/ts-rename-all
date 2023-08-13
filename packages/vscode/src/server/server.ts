import {
  renameDir,
  renameFile,
  renameFiles,
  renameSymbols,
} from '@ts-rename-all/core';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';

import {
  RenameDirRequestType,
  RenameFileRequestType,
  RenameFilesRequestType,
  RenameSymbolsRequestType,
} from '../shared/requests';

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize(() => {
  return {
    capabilities: {},
  };
});

connection.onRequest(RenameSymbolsRequestType, async (params) => {
  const { srcFilePath, srcSymbolPattern, destSymbolPattern } = params;
  try {
    await renameSymbols(srcFilePath, {
      srcSymbolPattern: srcSymbolPattern,
      destSymbolPattern: destSymbolPattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.onRequest(RenameFileRequestType, async (params) => {
  const { srcFilePath, destFileName, srcFileName } = params;
  try {
    await renameFile(srcFilePath, {
      destFileName,
      srcFileName,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.onRequest(RenameFilesRequestType, async (params) => {
  const { dirPath, srcFileNamePattern, destFileNamePattern } = params;
  try {
    await renameFiles(dirPath, {
      srcFileNamePattern,
      destFileNamePattern,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.onRequest(RenameDirRequestType, async (params) => {
  const { srcDirPath, destDirName, srcDirName } = params;
  try {
    await renameDir(srcDirPath, {
      destDirName,
      srcDirName,
    });
  } catch (e) {
    return (e as Error).message;
  }
});

connection.listen();
