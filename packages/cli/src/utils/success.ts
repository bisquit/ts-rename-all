import { outro } from '@clack/prompts';
import colors from 'picocolors';
export function success() {
  outro(colors.cyan('✔ Successfully renamed.'));
}
