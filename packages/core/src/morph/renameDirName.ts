import { resolve } from 'node:path';

import { Directory } from 'ts-morph';

export async function renameDirName(
  directory: Directory,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  const destDirName = directory
    .getBaseName()
    .replace(srcSymbolPattern, destSymbolPattern);

  const destDirPath = resolve(directory.getPath(), '..', destDirName);

  directory.move(destDirPath);
}
