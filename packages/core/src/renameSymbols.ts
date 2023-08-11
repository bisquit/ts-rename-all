import { Project } from 'ts-morph';

import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';

export async function renameSymbols(
  srcFilePath: string,
  config: { before: string; after: string },
) {
  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(srcFilePath);

  // derive changes
  const changes = deriveSymbolChanges(config.before, config.after);

  // iterate changes and run morph.renameSymbols
  for (const change of changes) {
    await _renameSymbols(sourceFile, {
      srcSymbolPattern: change.before,
      destSymbolPattern: change.after,
    });
  }

  await project.save();
}
