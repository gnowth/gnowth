module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Note: the following config will add typechecking in eslint
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: '**/tsconfig.json' },
}
