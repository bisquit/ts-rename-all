import { Project } from 'ts-morph';

import { deriveFilenameChanges } from './derive-change/deriveFilenameChanges.js';
import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameDirName as _renameDirName } from './morph/renameDirName.js';
import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { addSourceFilesByPhysicalPaths } from './utils/addSourceFiles.js';
import { getChildDirectories } from './utils/getChildDirectories.js';

/**
 * Rename single directory name, and all child dirnames, filenames and symbols.
 * This API is specialized for IDE rename usecase.
 */
export async function renameDir(
  /**
   * Directory path. Do not accept glob pattern.
   */
  dirPath: string,
  /**
   * Configuration.
   */
  config: {
    destDirName: string;
    srcSymbolPattern: string;
    destSymbolPattern: string;
  },
) {
  const { destDirName, srcSymbolPattern, destSymbolPattern } = config;

  const project = new Project({});
  await addSourceFilesByPhysicalPaths(project, [dirPath]);

  // rename root dirname
  const rootDir = project.getDirectoryOrThrow(dirPath);
  await _renameDirName(rootDir, { destDirName });

  // rename child dirnames
  const childDirs = await getChildDirectories(project);
  const dirnameChanges = deriveFilenameChanges({
    before: srcSymbolPattern,
    after: destSymbolPattern,
  });
  for (const dir of childDirs) {
    for (const change of dirnameChanges) {
      await _renameDirName(dir, {
        srcSymbolPattern: change.before,
        destSymbolPattern: change.after,
      });
    }
  }

  // rename filenames
  const sourceFiles = project.getSourceFiles();
  const filenameChanges = deriveFilenameChanges({
    before: srcSymbolPattern,
    after: destSymbolPattern,
  });
  for (const sourceFile of sourceFiles) {
    for (const change of filenameChanges) {
      await _renameFilename(sourceFile, {
        srcSymbolPattern: change.before,
        destSymbolPattern: change.after,
      });
    }
  }

  // rename symbols
  const symbolChanges = deriveSymbolChanges({
    before: srcSymbolPattern,
    after: destSymbolPattern,
  });
  for (const sourceFile of sourceFiles) {
    for (const change of symbolChanges) {
      await _renameSymbols(sourceFile, {
        srcSymbolPattern: change.before,
        destSymbolPattern: change.after,
      });
    }
  }

  await project.save();
}
