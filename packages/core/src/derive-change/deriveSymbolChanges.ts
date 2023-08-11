import { camelCase, constantCase, pascalCase } from 'change-case';

import { dedupeChange } from './dedupeChange.js';
import { Change } from './types.js';

export function deriveSymbolChanges({ before, after }: Change): Change[] {
  const upperCamelChange = {
    before: pascalCase(before),
    after: pascalCase(after),
  };

  const lowerCamelChange = {
    before: camelCase(before),
    after: camelCase(after),
  };

  const constantChange = {
    before: constantCase(before),
    after: constantCase(after),
  };

  return dedupeChange([upperCamelChange, lowerCamelChange, constantChange]);
}
