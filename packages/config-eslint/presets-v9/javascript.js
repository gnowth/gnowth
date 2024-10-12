import { commentsConfigs } from '../configs-v9/comments'
import { eslintConfigs } from '../configs-v9/eslint'
import { importConfigs } from '../configs-v9/import'
import { jestConfigs } from '../configs-v9/jest'
import { jsxA11yConfigs } from '../configs-v9/jsx-a11y'
import { perfectionistConfigs } from '../configs-v9/perfectionist'
import { prettierConfigs } from '../configs-v9/prettier'
import { promiseConfigs } from '../configs-v9/promise'
import { reactConfigs } from '../configs-v9/react'
import { reactHookConfigs } from '../configs-v9/react-hook'
import { sonarjsConfigs } from '../configs-v9/sonarjs'
import { testingLibraryConfigs } from '../configs-v9/testing-library'

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
]
