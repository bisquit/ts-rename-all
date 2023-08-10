import { getPathComponents } from '@ts-rename-all/shared';
import { pascalCase } from 'change-case';
import { Project } from 'ts-morph';

import { renameDirName as _renameDirName } from './morph/renameDirName.js';
import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { diffText } from './utils/diffText.js';

export async function renameDir(
  srcDirPath: string,
  config: { destDirName: string; srcDirName?: string },
) {
  const srcDirName =
    config.srcDirName ?? getPathComponents(srcDirPath).filename;

  const project = new Project({});
  project.addSourceFilesAtPaths(`${srcDirPath}/**/*.{ts,tsx}`);

  const rootDir = project.getRootDirectories().at(0);
  if (!rootDir) {
    throw new Error('Be sure to specify a directory.');
  }

  const { before, after } = diffText(srcDirName, config.destDirName);

  await _renameDirName(rootDir, {
    srcSymbolPattern: before ?? '',
    destSymbolPattern: after ?? '',
  });

  for (const sourceFile of project.getSourceFiles()) {
    await _renameFilename(sourceFile, {
      srcSymbolPattern: pascalCase(before),
      destSymbolPattern: pascalCase(after),
    });

    await _renameSymbols(sourceFile, {
      srcSymbolPattern: pascalCase(before),
      destSymbolPattern: pascalCase(after),
    });
  }

  await project.save();
}
