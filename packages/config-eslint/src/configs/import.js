import importPlugin from 'eslint-plugin-import'

export const importConfigs = [
  importPlugin.flatConfigs.recommended,
  // TODO: check for typescript config
  {
    // https://github.com/isaacs/minimatch
    // https://globster.xyz
    files: [
      '**/config-eslint/**/*',
      '**/src/app-experimental/**/*',
      '**/src/app/**/*',
      '**/src/pages/**/*',
      '**/*.config.*',
      '**/*.stories.*',
      '**/mock/mock-*.js',
    ],
    name: 'import/no-default-export',
    rules: { 'import/no-default-export': 'off' },
  },
  {
    name: 'import/namespace',
    rules: { 'import/namespace': ['error', { allowComputed: true }] },
  },
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.tsx', '**/*.ts'],
    settings: {
      'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['packages/*/tsconfig.json', 'tsconfig.json'],
        },
      },
    },
  },
]
