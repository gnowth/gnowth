import sonarjs from 'eslint-plugin-sonarjs'

export const sonarjsConfigs = [
  sonarjs.configs.recommended,
  { plugins: { sonarjs } },
  {
    rules: {
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/different-types-comparison': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/hook-use-state': 'off',
      'sonarjs/jsx-no-constructed-context-values': 'off',
      'sonarjs/jsx-no-useless-fragment': 'off',
      'sonarjs/no-array-index-key': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/no-dead-store': 'off',
      // Note: only keep this one
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-ignored-exceptions': 'off',
      'sonarjs/no-misused-promises': 'off',
      'sonarjs/no-redundant-type-constituents': 'off',
      'sonarjs/no-unstable-nested-components': 'off',
      'sonarjs/no-unused-expressions': 'off',
      'sonarjs/no-unused-private-class-members': 'off',
      'sonarjs/prefer-enum-initializers': 'off',
      'sonarjs/prefer-nullish-coalescing': 'off',
      'sonarjs/public-static-readonly': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/slow-regex': 'off',
      'sonarjs/sonar-prefer-read-only-props': 'off',
      'sonarjs/todo-tag': 'off',
      'sonarjs/use-type-alias': 'off',
    },
  },
]