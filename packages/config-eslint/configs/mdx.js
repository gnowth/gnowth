module.exports = {
  extends: ['plugin:mdx/recommended'],

  parser: 'eslint-mdx',

  plugins: ['mdx'],

  settings: {
    'mdx/code-blocks': true,
    'mdx/language-mapper': {},
  },
}
