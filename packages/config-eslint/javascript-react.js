module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    './configs/comments',
    './configs/eslint--sort-keys',
    './configs/eslint',
    './configs/import',
    './configs/jsx-a11y',
    './configs/perfectionist',
    './configs/prettier',
    './configs/promise',
    './configs/react',
    './configs/sonarjs',
    './configs/tests',
  ],

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  root: true,
}
