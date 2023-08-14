import { Project } from 'ts-morph';

import { deriveFilenameChanges } from './derive-change/deriveFilenameChanges.js';
import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameDirName as _renameDirName } from './morph/renameDirName.js';
import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { getChildDirectories } from './utils/getChildDirectories.js';

/**
 * Rename single file name, and symbols in the file.
 * This API is specialized for IDE rename usecase.
 */
export async function renameFile(
  /**
   * File path. Do not accept glob pattern.
   */
  filePath: string,
  /**
   * Configuration.
   */
  config: {
    destFileName: string;
    srcSymbolPattern: string;
    destSymbolPattern: string;
  },
) {
  const { destFileName, srcSymbolPattern, destSymbolPattern } = config;

  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(filePath);

  // rename filename
  await _renameFilename(sourceFile, { destFileName });

  // rename symbols
  const symbolChanges = deriveSymbolChanges({
    before: srcSymbolPattern,
    after: destSymbolPattern,
  });
  for (const change of symbolChanges) {
    await _renameSymbols(sourceFile, {
      srcSymbolPattern: change.before,
      destSymbolPattern: change.after,
    });
  }

  await project.save();
}
