import { SourceFile } from 'ts-morph';

export async function renameFileName(
  sourceFile: SourceFile,
  config: { srcSymbolPattern: string; destSymbolPattern: string },
) {
  const { srcSymbolPattern, destSymbolPattern } = config;

  const destFileName = sourceFile
    .getBaseName()
    .replace(srcSymbolPattern, destSymbolPattern);
  sourceFile.move(destFileName);
}
