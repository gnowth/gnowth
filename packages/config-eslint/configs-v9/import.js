import importPlugin from 'eslint-plugin-import'

const importNoDefaultExport = {
  overrides: [
    {
      // https://github.com/isaacs/minimatch
      files: [
        '**/config-eslint/**/*',
        '**/src/app-experimental/**/*',
        '**/src/app/**/*',
        '**/src/pages/**/*',
        '**/*.config.*',
        '**/*.stories.*',
        '**/mock/mock-*.js',
      ],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
  rules: { 'import/no-default-export': 'error' },
}

const importOrder = {
  rules: { 'import/order': ['error', { groups: ['builtin', 'external', ['parent', 'sibling'], 'index'] }] },
}

export const importConfigs = [importPlugin.flatConfigs.recommended, importNoDefaultExport, importOrder]
