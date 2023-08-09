## develop

```sh
# Install dependencies
pnpm i
```

## Build

```sh
pnpm build
```

## Publish

```sh
pnpm bump

pnpm publish -r
```

## CLI

```sh
# Run src (cli.ts) directly
pnpm dev fixtures/app-button

# with debug log
DEBUG=tsrep pnpm dev fixtures/app-button
```
