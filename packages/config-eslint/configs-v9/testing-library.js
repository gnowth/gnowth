import { fixupPluginRules } from '@eslint/compat'
import testingLibrary from 'eslint-plugin-testing-library'

export const testingLibraryConfigs = [
  {
    files: ['**/*.test.@(j|t)s?(x)'],
    ...testingLibrary.configs['flat/react'],
    plugins: { 'testing-library': fixupPluginRules(testingLibrary) },
  },
  {
    name: 'testing-library/render-result-naming-convention',
    rules: { 'testing-library/render-result-naming-convention': 'off' },
  },
]
