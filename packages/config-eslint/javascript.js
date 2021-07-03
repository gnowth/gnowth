module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  plugins: ['eslint-comments', 'import', 'jest', 'prettier', 'promise'],

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json'],
      },
    },
    'import/extensions': ['.js'],
  },

  rules: {
    'jest/no-deprecated-functions': 0,
    'prettier/prettier': 'error',
  },
}
