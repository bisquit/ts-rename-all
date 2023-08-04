/**
 * ```sh
 * tsrep fixtures/AppButton.tsx
 * ```
 */

import { Project } from 'ts-morph';
import { resolve } from 'node:path';
import { getPathComponents } from './utils/get-path-components.js';

export async function main(src: string) {
  // get filename of the source file
  const { name: srcFilename } = getPathComponents(src);

  // prompts new name

  // replicate
}

/**
 * replicate('AppButton.tsx');
 */
export async function replicate(
  src: string,
  config: { srcSymbol: string; destSymbol: string },
) {
  console.log('replicating', src);
  const { srcSymbol, destSymbol } = config;

  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(src);

  console.log('getbasename', sourceFile.getBaseName());

  const destFile = sourceFile.copy(`AppButton2.tsx`, {
    overwrite: true,
  });

  const functions = destFile.getFunctions();
  for (const fn of functions) {
    const fnName = fn.getName();
    console.log('fnName', fnName);
    fn.rename('AppButton2');
  }

  // 5. save the new file
  await destFile.save();
}

await replicate(resolve('fixtures/AppButton.tsx'), {
  srcSymbol: 'AppButton',
  destSymbol: 'AppButton2',
});
