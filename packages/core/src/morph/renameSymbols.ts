import { debug } from '@ts-rename-all/util/debug.js';
import { SourceFile } from 'ts-morph';

export async function renameSymbols(
  sourceFile: SourceFile,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  // functions
  const functions = sourceFile.getFunctions();
  for (const fn of functions) {
    const name = fn.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`function: ${name} -> ${renamed}`);
      fn.rename(renamed);
    }
  }

  // types
  const types = sourceFile.getTypeAliases();
  for (const type of types) {
    const name = type.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`type: ${name} -> ${renamed}`);
      type.rename(renamed);
    }
  }

  // variables
  const variables = sourceFile.getVariableDeclarations();
  for (const variable of variables) {
    const name = variable.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`variable: ${name} -> ${renamed}`);
      variable.rename(renamed);
    }
  }
}
