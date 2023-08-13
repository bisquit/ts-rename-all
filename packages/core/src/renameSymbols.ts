import { Project } from 'ts-morph';

import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { addSourceFiles as _addSourceFiles } from './morph/addSourceFiles.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';

export async function renameSymbols(
  srcPaths: string[],
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  const project = new Project({});
  await _addSourceFiles(project, srcPaths);

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
