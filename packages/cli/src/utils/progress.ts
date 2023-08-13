import { spinner } from '@clack/prompts';

export async function progress(
  startMessage: string,
  cb: () => Promise<void>,
  stopMessage: string,
) {
  const s = spinner();
  s.start(startMessage);

  await cb();

  s.stop(stopMessage);
}
