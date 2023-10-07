module.exports = {
  extends: ['plugin:import/recommended'],
  overrides: [
    {
      extends: ['plugin:import/typescript'],
      files: ['**/*.tsx', '**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: '**/tsconfig.json' },
      settings: {
        'import/resolver': {
          node: true,
          typescript: true,
        },
      },
    },
  ],
}
