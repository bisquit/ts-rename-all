/**
 * ```sh
 * tsrep fixtures/AppButton.tsx
 * ```
 */

import { Project } from 'ts-morph';
import { resolve } from 'node:path';

/**
 * replicate('AppButton.tsx');
 */
export async function replicate(src: string) {
  console.log('replicating', src);

  const project = new Project({});

  const sourceFile = project.addSourceFileAtPath(src);
  const destFile = sourceFile.copy('AppButton2.tsx', {
    overwrite: true,
  });

  const functions = destFile.getFunctions();
  for (const fn of functions) {
    const fnName = fn.getName();
    console.log('fnName', fnName);
    fn.rename('AppButton2');
  }
  await destFile.save();
}

await replicate(resolve('fixtures/AppButton.tsx'));
