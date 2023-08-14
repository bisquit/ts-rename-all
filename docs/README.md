## CLI Reference

### Install

```sh
pnpm add -g @ts-rename-all/cli
```

### Usage

```sh
ts-rename-all src/app-button
#=> Then follow the prompts
```

## VSCode Extension

https://marketplace.visualstudio.com/items?itemName=bisquit.vscode-ts-rename-all

## Node.js API Reference

### Install

```sh
pnpm add @ts-rename-all/core
```

### API

```ts
import { renameAll } from '@ts-rename-all/core';

await renameAll(resolve('app-button'), {
  srcSymbolPattern: 'Button',
  destSymbolPattern: 'Tab',
});
```

See [sources](https://github.com/bisquit/ts-rename-all/tree/main/packages/core) for more APIs.
