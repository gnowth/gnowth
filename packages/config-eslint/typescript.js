module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    './configs/eslint--sort-keys',
    './configs/import--no-default-export',
    // './configs/import--order',
    './configs/import',
    './configs/perfectionist',
    './configs/prettier',
    './configs/sonarjs',
    './configs/tests',
    './configs/typescript',
  ],

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  root: true,

  // settings: {
  //   'import/extensions': ['.d.ts', '.ts', '.json'],
  // },
}
