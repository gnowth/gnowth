import tseslint from 'typescript-eslint'

export const typescriptEslintConfigs = tseslint.config(
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.?(c|m)ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        // tsconfigRootDir: import.meta.dirname,
      },
    },
    name: '@typescript-eslint/language-options',
  },
  {
    files: ['**/*.?(c|m)ts', '**/*.tsx'],
    name: '@typescript-eslint/consistent-type-definitions',
    rules: { '@typescript-eslint/consistent-type-definitions': ['error', 'type'] },
  },
  {
    files: ['**/*.?(c|m)ts', '**/*.tsx'],
    name: '@typescript-eslint/no-unused-expressions',
    rules: { '@typescript-eslint/no-unused-expressions': ['error', { allowTaggedTemplates: true }] },
  },
  {
    files: ['**/*.?(c|m)ts', '**/*.tsx'],
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
