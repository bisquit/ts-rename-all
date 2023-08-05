import { SourceFile } from 'ts-morph';

import { debug } from '../utils/debug.js';

export async function renameSymbols(
  sourceFile: SourceFile,
  config: { srcSymbol: string; destSymbol: string },
) {
  const { srcSymbol, destSymbol } = config;

  // functions
  const functions = sourceFile.getFunctions();
  for (const fn of functions) {
    const name = fn.getName();
    if (name?.includes(srcSymbol)) {
      const renamed = name.replace(srcSymbol, destSymbol);
      debug(`function: ${name} -> ${renamed}`);
      fn.rename(renamed);
    }
  }

  // types
  const types = sourceFile.getTypeAliases();
  for (const type of types) {
    const name = type.getName();
    if (name?.includes(srcSymbol)) {
      const renamed = name.replace(srcSymbol, destSymbol);
      debug(`type: ${name} -> ${renamed}`);
      type.rename(renamed);
    }
  }

  // variables
  const variables = sourceFile.getVariableDeclarations();
  for (const variable of variables) {
    const name = variable.getName();
    if (name?.includes(srcSymbol)) {
      const renamed = name.replace(srcSymbol, destSymbol);
      debug(`variable: ${name} -> ${renamed}`);
      variable.rename(renamed);
    }
  }
}
