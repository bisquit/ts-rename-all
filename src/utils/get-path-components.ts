import { basename, extname } from 'node:path';

export function getPathComponents(path: string) {
  const filename = basename(path);
  const extension = extname(filename);
  const name = filename.replace(extension, '');

  return {
    filename,
    name: name,
    extension: extension,
  };
}
