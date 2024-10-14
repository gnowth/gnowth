import js from '@eslint/js'

export const eslintConfigs = [
  {
    name: 'eslint/recommended',
    ...js.configs.recommended,
  },
  {
    name: 'eslint/no-unused-vars',
    rules: { 'no-unused-vars': 'off' },
  },
  {
    name: 'eslint/sort-keys',
    rules: { 'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }] },
  },
]
