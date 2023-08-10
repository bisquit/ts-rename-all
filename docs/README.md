## CLI Reference

### Install

```sh
pnpm add -g @ts-rename-all/cli
```

### Usage

```sh
ts-rename-all
```

## Node.js API Reference

### Install

```sh
pnpm add -g @ts-rename-all/core
```

### API

#### renameSymbols

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
