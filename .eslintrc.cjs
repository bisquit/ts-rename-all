/*eslint-env commonjs*/

/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  ignorePatterns: ['**/fixtures/**/*', '**/tmp/**/*'],
};
