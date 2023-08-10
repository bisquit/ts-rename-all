import { Project } from 'ts-morph';

import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';

export async function renameSymbols(
  srcFilePath: string,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(srcFilePath);

  await _renameSymbols(sourceFile, config);

  await project.save();
}
