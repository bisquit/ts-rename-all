import { Project } from 'ts-morph';

import { deriveFilenameChanges } from './derive-change/deriveFilenameChanges.js';
import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameDirName as _renameDirName } from './morph/renameDirName.js';
import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { addSourceFilesByPhysicalPaths } from './utils/addSourceFiles.js';

/**
 * Rename filenames, dirnames and symbols in the given paths by pattern.
 */
export async function renameAll(
  /**
   * File or directory paths. Do not accept glob pattern.
   * @example
   * ['src/index.ts', 'src/foo-dir']
   */
  srcPaths: string[],
  /**
   * Configuration.
   */
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  const project = new Project({});
  await addSourceFilesByPhysicalPaths(project, srcPaths);

  // rename dirnames
  const dirs = project.getDirectories();
  const dirnameChanges = deriveFilenameChanges({
    before: srcSymbolPattern,
    after: destSymbolPattern,
  });
  for (const dir of dirs) {
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
