import hooksPlugin from 'eslint-plugin-react-hooks'

export const reactHookConfigs = [
  {
    name: 'react-hooks',
    ...hooksPlugin.configs.recommended,
    plugins: { 'react-hooks': hooksPlugin },
  },
  {
    name: 'react-hooks/exhaustive-deps',
    rules: { 'react-hooks/exhaustive-deps': 'error' },
  },
]
