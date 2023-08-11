import { Project } from 'ts-morph';

import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';

export async function renameSymbols(
  srcFilePath: string,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(srcFilePath);

  // derive changes
  const changes = deriveSymbolChanges({
    before: config.srcSymbolPattern,
    after: config.destSymbolPattern,
  });

  // iterate changes and run morph.renameSymbols
  for (const change of changes) {
    await _renameSymbols(sourceFile, {
      srcSymbolPattern: change.before,
      destSymbolPattern: change.after,
    });
  }

  await project.save();
}
