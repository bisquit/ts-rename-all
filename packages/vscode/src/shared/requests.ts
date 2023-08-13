import { RequestType } from 'vscode-jsonrpc/node';

type ErrorType = string | undefined;

export type RenameSymbolsRequestParams = {
  srcPaths: string[];
  srcSymbolPattern: string;
  destSymbolPattern: string;
};
export const RenameSymbolsRequestType = new RequestType<
  RenameSymbolsRequestParams,
  ErrorType,
  void
>('ts-rename-all/renameSymbols');

export type RenameAllRequestParams = {
  srcPaths: string[];
  srcSymbolPattern: string;
  destSymbolPattern: string;
};
export const RenameAllRequestType = new RequestType<
  RenameAllRequestParams,
  ErrorType,
  void
>('ts-rename-all/renameAll');
