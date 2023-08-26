module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],

  plugins: ['stylelint-prettier'],

  syntax: 'scss',

  rules: {
    'comment-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'value-list-max-empty-lines': null,
  },
}
