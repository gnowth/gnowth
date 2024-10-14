import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export const prettierConfigs = [
  {
    name: 'prettier',
    ...eslintPluginPrettierRecommended,
  },
]
