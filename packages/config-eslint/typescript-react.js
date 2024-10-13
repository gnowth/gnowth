module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    './configs/comments',
    './configs/eslint',
    './configs/import',
    './configs/jsx-a11y',
    './configs/perfectionist',
    './configs/prettier',
    './configs/promise',
    './configs/react',
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
  //   'import/extensions': ['.d.ts', '.ts', '.tsx', '.json'],
  // },
}
