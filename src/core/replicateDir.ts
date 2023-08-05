/**
 * ```sh
 * tsrep fixtures/AppButton.tsx
 * ```
 */

import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Project } from 'ts-morph';

import { copy } from '../utils/copy.js';
import { debug } from '../utils/debug.js';
import { renameFilename } from './renameFilename.js';
import { renameSymbols } from './renameSymbols.js';

export async function replicateDir(
  srcDirPath: string,
  config: { destDirName: string; srcSymbol: string; destSymbol: string },
) {
  const { destDirName, srcSymbol, destSymbol } = config;

  // copy directory
  const destDirPath = resolve(srcDirPath, '..', destDirName);
  if (existsSync(destDirPath)) {
    debug('removing', destDirPath);
    await rm(destDirPath, { recursive: true, force: true });
    // throw new Error(`Directory already exists: ${destDirPath}`);
  }
  await copy(srcDirPath, destDirPath);

  // project
  const project = new Project({});
  project.addSourceFilesAtPaths(`${destDirPath}/**/*.{ts,tsx}`);

  for (const sourceFile of project.getSourceFiles()) {
    await renameFilename(sourceFile, { srcSymbol, destSymbol });
    await renameSymbols(sourceFile, { srcSymbol, destSymbol });
  }

  await project.save();
}

// await replicateDir(resolve('fixtures/app-button'), {
//   destDirName: 'app-card',
//   srcSymbol: 'AppButton',
//   destSymbol: 'AppCard',
// });
