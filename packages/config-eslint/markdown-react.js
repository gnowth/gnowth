// DEBT: to check if all plugins/presets are compatible and explore preset for mdx
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    './configs/comments',
    './configs/import',
    // './configs/import--order',
    './configs/jsx-a11y',
    './configs/mdx',
    './configs/perfectionist',
    './configs/prettier',
    './configs/react',
    './configs/sonarjs',
  ],

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  root: true,
}
