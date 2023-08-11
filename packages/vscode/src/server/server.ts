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
  await renameSymbols(srcFilePath, {
    srcSymbolPattern: srcSymbolPattern,
    destSymbolPattern: destSymbolPattern,
  });
});

connection.onRequest(RenameFileRequestType, async (params) => {
  const { srcFilePath, destFileName, srcFileName } = params;
  await renameFile(srcFilePath, {
    destFileName,
    srcFileName,
  });
});

connection.onRequest(RenameFilesRequestType, async (params) => {
  const { dirPath, srcFileNamePattern, destFileNamePattern } = params;
  await renameFiles(dirPath, {
    srcFileNamePattern,
    destFileNamePattern,
  });
});

connection.onRequest(RenameDirRequestType, async (params) => {
  const { srcDirPath, destDirName, srcDirName } = params;
  await renameDir(srcDirPath, {
    destDirName,
    srcDirName,
  });
});

connection.listen();
