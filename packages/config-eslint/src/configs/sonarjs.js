import sonarjs from 'eslint-plugin-sonarjs'

export const sonarjsConfigs = [
  {
    name: 'sonarjs',
    ...sonarjs.configs['recommended'],
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
  {
    name: 'sonarjs/different-types-comparison',
    rules: { 'sonarjs/different-types-comparison': 'off' },
  },
  {
    // note: handled by @typescript-eslint/no-unused-expressions
    name: 'sonarjs/no-unused-expressions',
    rules: { 'sonarjs/no-unused-expressions': 'off' },
  },
  {
    // note: handled by no-unused-private-class-members
    name: 'sonarjs/no-unused-private-class-members',
    rules: { 'sonarjs/no-unused-private-class-members': 'off' },
  },
]
