import { debug } from '@ts-rename-all/shared';
import { SourceFile } from 'ts-morph';

export async function renameSymbols(
  sourceFile: SourceFile,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  // rename each symbols
  // see https://ts-morph.com/details/index

  // classes
  const classes = sourceFile.getClasses();
  for (const cls of classes) {
    const name = cls.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`class: ${name} -> ${renamed}`);
      cls.rename(renamed);
    }
  }

  // enums
  const enums = sourceFile.getEnums();
  for (const enm of enums) {
    const name = enm.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`enum: ${name} -> ${renamed}`);
      enm.rename(renamed);
    }
  }

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

  // interfaces
  const interfaces = sourceFile.getInterfaces();
  for (const itf of interfaces) {
    const name = itf.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`interface: ${name} -> ${renamed}`);
      itf.rename(renamed);
    }
  }

  // modules
  const modules = sourceFile.getModules();
  for (const mdl of modules) {
    const name = mdl.getName();
    if (name?.includes(srcSymbolPattern)) {
      const renamed = name.replace(srcSymbolPattern, destSymbolPattern);
      debug(`module: ${name} -> ${renamed}`);
      mdl.rename(renamed);
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
