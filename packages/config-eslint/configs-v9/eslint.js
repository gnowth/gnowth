import js from '@eslint/js'

const eslintSortKeys = { rules: { 'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }] } }
const eslintNoUnusedVars = { rules: { 'no-unused-vars': 'off' } }

export const eslintConfigs = [js.configs.recommended, eslintSortKeys, eslintNoUnusedVars]
