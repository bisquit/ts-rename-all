import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Project } from 'ts-morph';

import { renameSymbols } from '../renameSymbols.js';
import { copy } from '../utils/copy.js';
import { debug } from '../utils/debug.js';
import { renameFilename } from './renameFilename.js';

/**
 * replicate a directory
 * - renaming directory name
 * - renaming symbols
 */
export async function replicateDir(
  srcDirPath: string,
  config: { destDirName: string; srcSymbol: string; destSymbol: string },
) {
  const { destDirName, srcSymbol, destSymbol } = config;

  const destDirPath = resolve(srcDirPath, '..', destDirName);
  if (existsSync(destDirPath)) {
    debug('removing', destDirPath);
    await rm(destDirPath, { recursive: true, force: true });
  }
  await copy(srcDirPath, destDirPath);

  const project = new Project({});
  project.addSourceFilesAtPaths(`${destDirPath}/**/*.{ts,tsx}`);

  for (const sourceFile of project.getSourceFiles()) {
    await renameFilename(sourceFile, { srcSymbol, destSymbol });
    await renameSymbols(sourceFile, { srcSymbol, destSymbol });
  }

  await project.save();
}
