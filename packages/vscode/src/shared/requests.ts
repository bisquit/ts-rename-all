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

export type RenameDirRequestParams = {
  dirPath: string;
  destDirName: string;
  srcSymbolPattern: string;
  destSymbolPattern: string;
};
export const RenameDirRequestType = new RequestType<
  RenameDirRequestParams,
  ErrorType,
  void
>('ts-rename-all/renameDir');

export type RenameFileRequestParams = {
  filePath: string;
  destFileName: string;
  srcSymbolPattern: string;
  destSymbolPattern: string;
};
export const RenameFileRequestType = new RequestType<
  RenameFileRequestParams,
  ErrorType,
  void
>('ts-rename-all/renameFile');
