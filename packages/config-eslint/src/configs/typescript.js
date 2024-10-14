// eslint-disable-next-line import/no-unresolved
import tseslint from 'typescript-eslint'

export const typescriptEslintConfigs = tseslint.config(
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.?(c|m)ts?(x)'],
    languageOptions: { parserOptions: { projectService: true } },
    name: '@typescript-eslint/language-options',
  },
  {
    files: ['**/*.?(c|m)ts?(x)'],
    name: '@typescript-eslint/consistent-type-definitions',
    rules: { '@typescript-eslint/consistent-type-definitions': ['error', 'type'] },
  },
  {
    files: ['**/*.?(c|m)ts?(x)'],
    name: '@typescript-eslint/no-unused-expressions',
    rules: { '@typescript-eslint/no-unused-expressions': ['error', { allowTaggedTemplates: true }] },
  },
  {
    files: ['**/*.?(c|m)ts?(x)'],
    name: '@typescript-eslint/no-extraneous-class',
    rules: { '@typescript-eslint/no-extraneous-class': 'off' },
  },
  {
    files: ['**/*.?(c|m)ts?(x)'],
    name: '@typescript-eslint/no-unused-vars',
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/config-eslint/**/*', '**/config-jest/**/*'],
    name: '@typescript-eslint/no-require-imports',
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
)
