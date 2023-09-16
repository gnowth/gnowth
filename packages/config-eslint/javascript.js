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
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],

  overrides: [
    {
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      files: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    },
  ],

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['eslint-comments', 'import', 'jest', 'prettier', 'promise'],

  root: true,

  rules: {
    'import/no-default-export': 'warn',
    'prettier/prettier': 'error',
    'sort-keys': 'error',
  },

  settings: {
    'import/extensions': ['.js', '.cjs', '.mjs', '.json'],
  },
}
