import { Project } from 'ts-morph';

import { renameFileName as _renameFilename } from './morph/renameFileName.js';
import { renameSymbols as _renameSymbols } from './morph/renameSymbols.js';
import { diffText } from './utils/diffText.js';

export async function renameFiles(
  dirPath: string,
  config: { srcFileNamePattern: string; destFileNamePattern: string },
) {
  const project = new Project({});
  project.addSourceFilesAtPaths(`${dirPath}/**/*.{ts,tsx}`);

  const rootDir = project.getRootDirectories().at(0);
  if (!rootDir) {
    throw new Error('Be sure to specify a directory.');
  }

  const { before, after } = diffText(
    config.srcFileNamePattern,
    config.destFileNamePattern,
  );

  for (const sourceFile of project.getSourceFiles()) {
    await _renameFilename(sourceFile, {
      srcSymbolPattern: config.srcFileNamePattern,
      destSymbolPattern: config.destFileNamePattern,
    });

    await _renameSymbols(sourceFile, {
      srcSymbolPattern: before ?? '',
      destSymbolPattern: after ?? '',
    });
  }

  await project.save();
}
