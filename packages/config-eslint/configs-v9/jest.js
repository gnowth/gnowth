import jest from 'eslint-plugin-jest'

export const jestConfigs = [
  {
    files: ['**/*.test.@(j|t)s?(x)'],
    name: 'jest',
    ...jest.configs['flat/all'],
  },
  {
    files: ['**/*.test.@(j|t)s?(x)'],
    name: 'jest/max-expects',
    rules: { 'jest/max-expects': ['error', { max: 10 }] },
  },
]
