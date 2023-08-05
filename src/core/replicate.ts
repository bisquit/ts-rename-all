/**
 * ```sh
 * tsrep fixtures/AppButton.tsx
 * ```
 */

import { resolve } from 'node:path';

import { Project } from 'ts-morph';

import { copy } from '../utils/copy.js';
import { renameSymbols } from './renameSymbols.js';

export async function replicate(
  srcFilePath: string,
  config: { destFileName: string; srcSymbol: string; destSymbol: string },
) {
  const { destFileName, srcSymbol, destSymbol } = config;

  const destFilePath = resolve(srcFilePath, '..', destFileName);
  await copy(srcFilePath, destFilePath);

  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(destFilePath);

  // await renameFilename(sourceFile, { srcSymbol, destSymbol });
  await renameSymbols(sourceFile, { srcSymbol, destSymbol });

  await project.save();
}

// await replicate(resolve('fixtures/AppButton.tsx'), {
//   destFileName: 'AppCard.tsx',
//   srcSymbol: 'AppButton',
//   destSymbol: 'AppCard',
// });
