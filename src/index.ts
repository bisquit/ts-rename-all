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

  // copy with basename to destSymbol.<ext>
  const destFilename = sourceFile.getBaseName().replace(srcSymbol, destSymbol);
  const destFile = sourceFile.copy(destFilename, {
    overwrite: true,
  });

  const functions = destFile.getFunctions();
  for (const fn of functions) {
    const name = fn.getName();
    if (name?.includes(srcSymbol)) {
      const renamed = name.replace(srcSymbol, destSymbol);
      console.log(`function: ${name} -> ${renamed}`);
      fn.rename(renamed);
    }
  }

  const types = destFile.getTypeAliases();
  for (const type of types) {
    const name = type.getName();
    if (name?.includes(srcSymbol)) {
      const renamed = name.replace(srcSymbol, destSymbol);
      console.log(`type: ${name} -> ${renamed}`);
      type.rename(renamed);
    }
  }

  // 5. save the new file
  await destFile.save();
}

await replicate(resolve('fixtures/AppButton.tsx'), {
  srcSymbol: 'AppButton',
  destSymbol: 'AppCard',
});
