import { existsSync } from 'node:fs';

export async function checkFsExists(path: string) {
  if (!existsSync(path)) {
    throw new Error(`${path} does not exist`);
  }
}
