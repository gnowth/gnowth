import globals from 'globals'

import { commentsConfigs } from '../configs-v9/comments.js'
import { eslintConfigs } from '../configs-v9/eslint.js'
import { importConfigs } from '../configs-v9/import.js'
import { jestConfigs } from '../configs-v9/jest.js'
import { jsxA11yConfigs } from '../configs-v9/jsx-a11y.js'
import { perfectionistConfigs } from '../configs-v9/perfectionist.js'
import { prettierConfigs } from '../configs-v9/prettier.js'
import { promiseConfigs } from '../configs-v9/promise.js'
import { reactConfigs } from '../configs-v9/react.js'
import { reactHookConfigs } from '../configs-v9/react-hook.js'
import { sonarjsConfigs } from '../configs-v9/sonarjs.js'
import { testingLibraryConfigs } from '../configs-v9/testing-library.js'

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
    rules: {
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'no-empty': 'off',
      'no-unused-private-class-members': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'sonarjs/no-nested-functions': 'off',
    },
  },
]
