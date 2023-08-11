import { camelCase, constantCase, noCase, pascalCase } from 'change-case';

import { Change } from './types.js';

export function deriveSymbolChanges(before: string, after: string): Change[] {
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

  return [upperCamelChange, lowerCamelChange, constantChange];
}
