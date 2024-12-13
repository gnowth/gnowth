import globals from 'globals'

import { commentsConfigs } from '../configs/comments.js'
import { eslintConfigs } from '../configs/eslint.js'
import { importConfigs } from '../configs/import.js'
import { jestConfigs } from '../configs/jest.js'
import { jsxA11yConfigs } from '../configs/jsx-a11y.js'
import { perfectionistConfigs } from '../configs/perfectionist.js'
import { prettierConfigs } from '../configs/prettier.js'
import { promiseConfigs } from '../configs/promise.js'
import { reactHookConfigs } from '../configs/react-hook.js'
import { reactConfigs } from '../configs/react.js'
import { sonarjsConfigs } from '../configs/sonarjs.js'
import { testingLibraryConfigs } from '../configs/testing-library.js'

export const javascript = [
  ...commentsConfigs,
  ...eslintConfigs,
  ...importConfigs,
  ...jestConfigs,
  ...jsxA11yConfigs,
  ...perfectionistConfigs,
  ...prettierConfigs,
  ...promiseConfigs,
  ...reactConfigs,
  ...reactHookConfigs,
  ...sonarjsConfigs,
  ...testingLibraryConfigs,
  {
    ignores: [
      '**/.next/**/*',
      '**/.parcel-cache/',
      '**/.turbo/**/*',
      '**/artifact/',
      '**/build/**/*',
      '**/coverage/**/*',
      '**/node_modules/**/*',
      '**/volumes/**/*',
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    name: 'temporary-rules-to-remove',
    rules: {
      'no-unused-private-class-members': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/no-redundant-type-constituents': 'off',
      'sonarjs/todo-tag': 'off',
    },
  },
]
