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

  // parser: '@babel/eslint-parser',

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['eslint-comments', 'import', 'jest', 'prettier', 'promise'],

  settings: {
    'import/extensions': ['.js', '.cjs', '.mjs', '.json'],
  },

  rules: {
    'prettier/prettier': 'error',
  },

  overrides: [
    {
      files: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
}
