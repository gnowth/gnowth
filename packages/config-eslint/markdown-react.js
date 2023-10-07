// DEBT: to check if all plugins/presets are compatible and explore preset for mdx
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:mdx/recommended',
    './configs/import--order',
    './configs/import',
    './configs/prettier',
    './configs/react',
  ],

  parser: 'eslint-mdx',

  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['mdx'],

  root: true,

  settings: {
    'mdx/code-blocks': true,
    'mdx/language-mapper': {},
  },
}
