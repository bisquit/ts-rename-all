import { existsSync } from 'node:fs';
import { stat, statfs } from 'node:fs/promises';

export async function checkFsIsDirectory(path: string) {
  if (!(await stat(path)).isDirectory()) {
    throw new Error(`${path} is not a directory`);
  }
}
