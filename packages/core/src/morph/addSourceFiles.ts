import { stat } from 'node:fs/promises';
import { join } from 'node:path';

import { Project } from 'ts-morph';

export async function addSourceFiles(project: Project, srcPaths: string[]) {
  const globPaths = await Promise.all(
    srcPaths.map(async (path) => {
      return (await stat(path)).isDirectory()
        ? join(path, '**/*.{ts,tsx}')
        : path;
    }),
  );
  project.addSourceFilesAtPaths(globPaths);
}
