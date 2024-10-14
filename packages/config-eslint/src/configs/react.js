import reactPlugin from 'eslint-plugin-react'

export const reactConfigs = [
  {
    files: ['**/*.@(j|t)sx'],
    name: 'react',
    ...reactPlugin.configs.flat.recommended,
  },
  {
    files: ['**/*.@(j|t)sx'],
    name: 'react/jsx-sort-props',
    rules: { 'react/jsx-sort-props': 'error' },
  },
  {
    files: ['**/*.@(j|t)sx'],
    name: 'react/jsx-uses-react',
    rules: { 'react/jsx-uses-react': 'off' },
  },
  {
    files: ['**/*.@(j|t)sx'],
    name: 'react/prop-types',
    rules: { 'react/prop-types': 'off' },
  },
  {
    files: ['**/*.@(j|t)sx'],
    name: 'react/react-in-jsx-scope',
    rules: { 'react/react-in-jsx-scope': 'off' },
  },
]
