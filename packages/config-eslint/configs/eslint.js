module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'no-unused-vars': 'off',
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
  },
}
