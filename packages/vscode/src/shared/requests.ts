import { RequestType } from 'vscode-jsonrpc/node';

export type RenameSymbolsRequestParams = {
  srcFilePath: string;
  srcSymbolPattern: string;
  destSymbolPattern: string;
};
export const RenameSymbolsRequestType = new RequestType<
  RenameSymbolsRequestParams,
  void,
  void
>('ts-rename-all/renameSymbols');
