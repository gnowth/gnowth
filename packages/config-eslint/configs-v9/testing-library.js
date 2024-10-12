import testingLibrary from 'eslint-plugin-testing-library'

export const testingLibraryConfigs = [
  {
    files: ['**/__tests__/**/*.+(j|t)s?(x)', '**/?(*.)+(spec|test).+(j|t)s?(x)'],
    ...testingLibrary.configs['flat/react'],
  },
]
