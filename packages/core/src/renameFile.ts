import { getPathComponents } from '@ts-rename-all/shared';
import { Project } from 'ts-morph';

import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';

export async function renameFile(
  srcFilePath: string,
  config: { destFileName: string; srcFileName?: string },
) {
  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(srcFilePath);

  const srcFileName =
    config.srcFileName ?? getPathComponents(srcFilePath).filename;

  await _renameFilename(sourceFile, {
    destFileName: config.destFileName,
  });

  // derive changes
  const changes = deriveSymbolChanges({
    before: getPathComponents(srcFileName).name,
    after: getPathComponents(config.destFileName).name,
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
