import { getPathComponents } from '@ts-rename-all/shared';
import diff from 'fast-diff';
import { Project } from 'ts-morph';

import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { diffText } from './utils/diffText.js';

export async function renameFile(
  srcFilePath: string,
  config: { destFileName: string; srcFileName?: string },
) {
  const srcFileName =
    config.srcFileName ?? getPathComponents(srcFilePath).filename;

  const { before, after } = diffText(
    getPathComponents(srcFileName).name,
    getPathComponents(config.destFileName).name,
  );

  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(srcFilePath);

  await _renameFilename(sourceFile, {
    srcSymbolPattern: srcFileName,
    destSymbolPattern: config.destFileName,
  });

  await _renameSymbols(sourceFile, {
    srcSymbolPattern: before ?? '',
    destSymbolPattern: after ?? '',
  });

  await project.save();
}
