import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Project } from 'ts-morph';

import { renameSymbols } from '../renameSymbols.js';
import { copy } from '../utils/copy.js';
import { debug } from '../utils/debug.js';
import { renameFilename } from './renameFilename.js';

/**
 * - renaming directory name
 * - renaming symbols
 */
export async function replaceDir(
  srcDirPath: string,
  config: { destDirName: string; srcSymbol: string; destSymbol: string },
) {
  const { destDirName, srcSymbol, destSymbol } = config;

  const destDirPath = resolve(srcDirPath, '..', destDirName);
  if (existsSync(destDirPath)) {
    throw new Error(`Already exists.`);
  }

  const project = new Project({});
  project.addSourceFilesAtPaths(`${srcDirPath}/**/*.{ts,tsx}`);

  const rootDir = project.getRootDirectories().at(0);
  if (!rootDir) {
    throw new Error('Be sure to specify a directory.');
  }

  rootDir.move(destDirPath);

  for (const sourceFile of project.getSourceFiles()) {
    await renameFilename(sourceFile, { srcSymbol, destSymbol });
    await renameSymbols(sourceFile, { srcSymbol, destSymbol });
  }

  await project.save();
}
