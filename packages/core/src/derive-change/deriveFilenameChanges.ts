import { camelCase, paramCase, pascalCase, snakeCase } from 'change-case';

import { dedupeChange } from './dedupeChange.js';
import { Change } from './types.js';

export function deriveFilenameChanges({ before, after }: Change): Change[] {
  const upperCamelChange = {
    before: pascalCase(before),
    after: pascalCase(after),
  };

  const lowerCamelChange = {
    before: camelCase(before),
    after: camelCase(after),
  };

  const kebabChange = {
    before: paramCase(before),
    after: paramCase(after),
  };

  const snakeChange = {
    before: snakeCase(before),
    after: snakeCase(after),
  };

  return dedupeChange([
    upperCamelChange,
    lowerCamelChange,
    kebabChange,
    snakeChange,
  ]);
}
