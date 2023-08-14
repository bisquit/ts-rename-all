# vscode-ts-rename-all

Once rename a file name, then symbols are also renamed.

## Why?

I'm working with typescript files (including React components), and often do refactoring module names, or create a new module by copying a existing file and renaming it.

In that cases, I need to:

- rename a file name (`AppButton.tsx` to `AppTab.tsx`)
- rename each symbols (`function AppButton` to `function AppTab` and `type AppButtonProps` to `type AppTabProps`)

It becomes more burden when there are many files to rename.

This extension do that repetitive tasks by just a single renaming operation.

## Usage

### Rename a file

Right-click a file in the explorer, then `TS Rename All: Rename...`.

After entering a new file name, all symbols in the file are renamed automatically.

<img src="https://raw.githubusercontent.com/bisquit/ts-rename-all/main/packages/vscode/assets/demo/renameFile.gif" width="100%" />

### Rename a directory

This extension also supports renaming a directory.

Right-click a directory in the explorer, then `TS Rename All: Rename...`.

All files and symbols in the directory are renamed automatically.

<img src="https://raw.githubusercontent.com/bisquit/ts-rename-all/main/packages/vscode/assets/demo/renameDir.gif" width="100%" />

### Rename symbols

If you want to rename symbols without renaming file name, you can use `TS Rename All: Rename symbols` command.

<img src="https://raw.githubusercontent.com/bisquit/ts-rename-all/main/packages/vscode/assets/demo/renameSymbols.gif" width="100%" />

## How it works

This extension derives the pattern of symbols to be changed from the file name changes.

For example, if you rename `AppButton.tsx` to `AppTab.tsx`, the symbols including following are renamed:

- `AppButton` (`PacalCase`)
- `appButton` (`camelCase`)
- `APP_BUTTON` (`CONSTANT_CASE`)

Renaming are operated by [ts-morph](https://github.com/dsherret/ts-morph), TypeScript compiler API wrapper, so the references are also updated properly.
