module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  // TODO: check if plugin:functional could be used
  extends: [
    'plugin:import/errors',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaVersion: 2020,
    project: '**/tsconfig.json',
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'jest', 'prettier', 'promise'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.d.ts', '.ts', '.json'],
      },
    },
    'import/extensions': ['.ts'],
  },

  rules: {
    // TODO: review
    '@typescript-eslint/unbound-method': 0,

    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'class-methods-use-this': 0,
    'prettier/prettier': 'error',
  },
}
