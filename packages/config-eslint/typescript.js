module.exports = {
  env: {
    browser: true,
    es6: true,
    mongo: true,
    node: true,
    serviceworker: true,
    worker: true,
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    // Note: the following config will add typechecking in eslint
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    project: '**/tsconfig.json',
  },

  plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'jest', 'prettier', 'promise'],

  settings: {
    'import/extensions': ['.d.ts', '.ts', '.json'],
  },

  rules: {
    'prettier/prettier': 'error',
  },

  overrides: [
    {
      files: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
}
