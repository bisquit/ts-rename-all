import remove from 'just-remove';
import { Project } from 'ts-morph';

/**
 * Returns child directories.
 */
export async function getChildDirectories(project: Project) {
  const allDir = project.getDirectories();
  const rootDir = project.getRootDirectories();

  return remove(allDir, rootDir);
}
