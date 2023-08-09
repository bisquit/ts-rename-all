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
# Bump version, commit, tag, push
pnpm bump
```

Then, Github Actions will publish to npm.

## CLI

```sh
# Run src (cli.ts) directly
pnpm dev fixtures/app-button

# with debug log
DEBUG=tsrep pnpm dev fixtures/app-button
```
