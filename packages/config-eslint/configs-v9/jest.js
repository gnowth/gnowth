import jest from 'eslint-plugin-jest'

export const jestConfigs = [
  {
    files: ['**/__tests__/**/*.+(j|t)s?(x)', '**/?(*.)+(spec|test).+(j|t)s?(x)'],
    ...jest.configs['flat/all'],
  },
  { rules: { 'jest/max-expects': ['error', { max: 10 }] } },
]
