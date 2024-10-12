import reactPlugin from 'eslint-plugin-react'

export const reactConfigs = [
  {
    files: ['**/?(*.).+(j|t)sx'],
    ...reactPlugin.configs.flat.all,
  },
]
