import { outro } from '@clack/prompts';
import colors from 'picocolors';
export async function success() {
  outro(colors.cyan('✔ Successfully renamed.'));
}
