import { resolve } from 'node:path';

import { Directory } from 'ts-morph';

export async function renameDirName(
  directory: Directory,
  config:
    | { destDirName: string }
    | { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const srcDirName = directory.getBaseName();

  let destDirName: string;
  if ('destDirName' in config) {
    destDirName = config.destDirName;
  } else {
    const { srcSymbolPattern, destSymbolPattern } = config;
    destDirName = srcDirName.replace(srcSymbolPattern, destSymbolPattern);
  }

  const destDirPath = resolve(directory.getPath(), '..', destDirName);
  directory.move(destDirPath);
}
