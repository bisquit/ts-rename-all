## CLI Reference

### Install

```sh
pnpm add -g @ts-rename-all/cli
```

### Usage

#### Rename all symbols in a file

```sh
ts-rename-all symbols src/AppButton.tsx
```

#### Rename a file name and all symbols in the file

```sh
ts-rename-all file src/AppButton.tsx
```

#### Rename all files in a directory and all symbols in the files

```sh
ts-rename-all files src/app-button
```

#### Rename a directory name and all files in the directory and all symbols in the files

```sh
ts-rename-all dir src/app-button
```

## VSCode Extension

https://marketplace.visualstudio.com/items?itemName=bisquit.vscode-ts-rename-all

## Node.js API Reference

### Install

```sh
pnpm add @ts-rename-all/core
```

### API

#### renameSymbols

Rename all symbols in a file.

```ts
renameSymbols(srcFilePath: string, config: {
  srcSymbolPattern: string;
  destSymbolPattern: string;
}): Promise<void>;
```

```ts
import { renameSymbols } from '@ts-rename-all/core';

await renameSymbols(resolve('AppButton.tsx'), {
  srcSymbolPattern: 'Button',
  destSymbolPattern: 'Tab',
});
```

#### renameFile

Rename a file name and all symbols in the file.

```ts
renameFile(srcFilePath: string, config: {
  destFileName: string;
  srcFileName?: string;
}): Promise<void>;
```

```ts
import { renameFile } from '@ts-rename-all/core';

await renameFile(resolve('AppButton.tsx'), {
  destFileName: 'AppTab.tsx',
});
```

#### renameFiles

Rename all files in a directory and all symbols in the files.

```ts
renameFiles(dirPath: string, config: {
  srcFileNamePattern: string;
  destFileNamePattern: string;
}): Promise<void>;
```

```ts
import { renameFiles } from '@ts-rename-all/core';

await renameFiles(resolve('app-button'), {
  srcFileNamePattern: 'Button',
  destFileNamePattern: 'Tab',
});
```

#### renameDir

Rename a directory name and all files in the directory and all symbols in the files.

```ts
renameDir(srcDirPath: string, config: {
  destDirName: string;
  srcDirName?: string;
}): Promise<void>;
```

```ts
import { renameDir } from '@ts-rename-all/core';

await renameDir(resolve('app-button'), {
  destDirName: 'app-tab',
});
```
