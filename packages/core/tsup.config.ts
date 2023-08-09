import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs', 'esm'],
  clean: true,
  // noExternal: ['@ts-rename-all/util'],
  // skipNodeModulesBundle: true,
});
