module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    './configs/comments',
    './configs/eslint--sort-keys',
    './configs/import--no-default-export',
    // './configs/import--order',
    './configs/import',
    './configs/jsx-a11y',
    // Note: sonarjs must be before next config. otherwise it throws error
    './configs/sonarjs',
    './configs/next',
    './configs/perfectionist',
    './configs/prettier',
    './configs/promise',
    './configs/react',
    './configs/tests',
    './configs/typescript',
  ],

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  root: true,
}
