import { cancel, isCancel } from '@clack/prompts';

export async function cancellable<T>(promptPromise: Promise<T | symbol>) {
  const value = await promptPromise;

  if (isCancel(value)) {
    cancel('Cancelled.');
    process.exit(0);
  }

  return value;
}
