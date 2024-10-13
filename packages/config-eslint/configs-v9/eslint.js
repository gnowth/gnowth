import js from '@eslint/js'

const eslintNoUnusedVars = { rules: { 'no-unused-vars': 'off' } }
const eslintSortKeys = { rules: { 'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }] } }

export const eslintConfigs = [js.configs.recommended, eslintNoUnusedVars, eslintSortKeys]
