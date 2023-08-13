import { getPathComponents } from '@ts-rename-all/shared';
import { Project } from 'ts-morph';

import { deriveFilenameChanges } from './derive-change/deriveFilenameChanges.js';
import { deriveSymbolChanges } from './derive-change/deriveSymbolChanges.js';
import { renameDirName as _renameDirName } from './morph/renameDirName.js';
import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';

export async function renameDir(
  srcDirPath: string,
  config: { destDirName: string; srcDirName?: string },
) {
  const project = new Project({});
  project.addSourceFilesAtPaths(`${srcDirPath}/**/*.{ts,tsx}`);

  const srcDirName =
    config.srcDirName ?? getPathComponents(srcDirPath).filename;

  const rootDir = project.getRootDirectories().at(0);
  if (!rootDir) {
    throw new Error('Be sure to specify a directory.');
  }

  await _renameDirName(rootDir, {
    destDirName: config.destDirName,
  });

  for (const sourceFile of project.getSourceFiles()) {
    const beforeFilename = sourceFile.getBaseName();

    // derive dirname changes
    const dirnameChanges = deriveFilenameChanges({
      before: srcDirName,
      after: config.destDirName,
    });

    // iterate dirname changes and run morph.renameFilename
    for (const change of dirnameChanges) {
      await _renameFilename(sourceFile, {
        srcSymbolPattern: change.before,
        destSymbolPattern: change.after,
      });
    }

    const afterFilename = sourceFile.getBaseName();

    // derive symbol changes
    const symbolChanges = deriveSymbolChanges({
      before: getPathComponents(beforeFilename).name,
      after: getPathComponents(afterFilename).name,
    });

    // iterate changes and run morph.renameSymbols
    for (const change of symbolChanges) {
      await _renameSymbols(sourceFile, {
        srcSymbolPattern: change.before,
        destSymbolPattern: change.after,
      });
    }
  }

  await project.save();
}
