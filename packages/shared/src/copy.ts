import shell from 'shelljs';

export async function copy(src: string, dist: string): Promise<void> {
  const result = shell.cp('-R', src, dist);
  if (result.code === 1) {
    throw new Error(result.stderr);
  }
}
