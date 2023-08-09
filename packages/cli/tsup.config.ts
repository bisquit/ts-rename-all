import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  clean: true,
  // noExternal: ['@ts-rename-all/shared'],
  // skipNodeModulesBundle: true,
});
