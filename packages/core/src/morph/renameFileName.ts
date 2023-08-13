import { SourceFile } from 'ts-morph';

export async function renameFileName(
  sourceFile: SourceFile,
  config:
    | { destFileName: string }
    | { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const srcFileName = sourceFile.getBaseName();

  let destFileName: string;
  if ('destFileName' in config) {
    destFileName = config.destFileName;
  } else {
    const { srcSymbolPattern, destSymbolPattern } = config;
    destFileName = srcFileName.replace(srcSymbolPattern, destSymbolPattern);
  }

  if (srcFileName !== destFileName) {
    sourceFile.move(destFileName);
  }
}
