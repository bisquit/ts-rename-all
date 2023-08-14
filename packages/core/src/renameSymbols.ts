import { Project } from 'ts-morph';

import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { addSourceFilesByPhysicalPaths } from './utils/addSourceFiles.js';

/**
 * Rename symbols in the given paths by pattern.
 */
export async function renameSymbols(
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

  const sourceFiles = project.getSourceFiles();

  const changes = deriveSymbolChanges({
    before: srcSymbolPattern,
    after: destSymbolPattern,
  });

  for (const sourceFile of sourceFiles) {
    for (const change of changes) {
      await _renameSymbols(sourceFile, {
        srcSymbolPattern: change.before,
        destSymbolPattern: change.after,
      });
    }
  }

  await project.save();
}
