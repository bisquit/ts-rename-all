import { stat } from 'node:fs/promises';
import { join } from 'node:path';

import { Project } from 'ts-morph';

/**
 * Add source files to the project by simple directory path or file path.
 * (in ts-morph Project, directory should be added with glob pattern)
 */
export async function addSourceFilesByPhysicalPaths(
  project: Project,
  srcPaths: string[],
) {
  const globPaths = await Promise.all(
    srcPaths.map(async (path) => {
      return (await stat(path)).isDirectory()
        ? join(path, '**/*.{ts,tsx}')
        : path;
    }),
  );
  return project.addSourceFilesAtPaths(globPaths);
}
