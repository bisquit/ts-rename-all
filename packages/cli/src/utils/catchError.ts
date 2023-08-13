import { outro } from '@clack/prompts';
import colors from 'picocolors';

export async function catchError(cb: () => Promise<void>) {
  try {
    await cb();
  } catch (e: unknown) {
    outro(colors.red(`${e}`));
    process.exit(1);
  }
}
