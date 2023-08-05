import { SourceFile } from 'ts-morph';

export async function renameFilename(
  sourceFile: SourceFile,
  config: { srcSymbol: string; destSymbol: string },
) {
  const { srcSymbol, destSymbol } = config;

  const destFilename = sourceFile.getBaseName().replace(srcSymbol, destSymbol);
  sourceFile.move(destFilename);
}
