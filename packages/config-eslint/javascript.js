module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    './configs/eslint--sort-keys',
    './configs/import--no-default-export',
    './configs/import--order',
    './configs/import',
    './configs/prettier',
    './configs/tests',
  ],

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  root: true,

  // settings: {
  //   'import/extensions': ['.js', '.cjs', '.mjs', '.json'],
  // },
}
