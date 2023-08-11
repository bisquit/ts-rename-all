import { Change } from './types.js';

export function dedupeChange(changes: Change[]): Change[] {
  return changes.reduce<Change[]>((acc, change) => {
    if (
      acc.some((v) => v.before === change.before && v.after === change.after)
    ) {
      return acc;
    }

    return [...acc, change];
  }, []);
}
