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

export type RenameFileRequestParams = {
  srcFilePath: string;
  destFileName: string;
  srcFileName: string;
};
export const RenameFileRequestType = new RequestType<
  RenameFileRequestParams,
  void,
  void
>('ts-rename-all/renameFile');

export type RenameFilesRequestParams = {
  dirPath: string;
  srcFileNamePattern: string;
  destFileNamePattern: string;
};
export const RenameFilesRequestType = new RequestType<
  RenameFilesRequestParams,
  void,
  void
>('ts-rename-all/renameFiles');

export type RenameDirRequestParams = {
  srcDirPath: string;
  destDirName: string;
  srcDirName: string;
};
export const RenameDirRequestType = new RequestType<
  RenameDirRequestParams,
  void,
  void
>('ts-rename-all/renameDir');
