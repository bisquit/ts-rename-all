import { SourceFile } from 'ts-morph';

export async function renameFileName(
  sourceFile: SourceFile,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  const srcFileName = sourceFile.getBaseName();
  const destFileName = srcFileName.replace(srcSymbolPattern, destSymbolPattern);

  if (srcFileName !== destFileName) {
    sourceFile.move(destFileName);
  }
}
