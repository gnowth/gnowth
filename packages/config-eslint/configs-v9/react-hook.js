import hooksPlugin from 'eslint-plugin-react-hooks'

export const reactHookConfigs = [
  {
    ignores: ['**/__tests__/**/*.+(j|t)s?(x)', '**/?(*.)+(spec|test).+(j|t)s?(x)'],
    plugins: { 'react-hooks': hooksPlugin },
    rules: hooksPlugin.configs.recommended,
  },
]
