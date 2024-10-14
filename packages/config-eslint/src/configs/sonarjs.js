import sonarjs from 'eslint-plugin-sonarjs'

export const sonarjsConfigs = [
  {
    name: 'sonarjs',
    ...sonarjs.configs['recommended-legacy'],
    plugins: { sonarjs },
  },
  {
    name: 'sonarjs/no-duplicate-string',
    rules: { 'sonarjs/no-duplicate-string': 'off' },
  },
  {
    name: 'sonarjs/redundant-type-aliases',
    rules: { 'sonarjs/redundant-type-aliases': 'off' },
  },
]
