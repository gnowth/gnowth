module.exports = {
  extends: ['plugin:import/recommended'],
  overrides: [
    {
      extends: ['plugin:import/typescript'],
      files: ['**/*.tsx', '**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: '**/tsconfig.json' },
      settings: {
        'import/resolver': {
          node: true,
          typescript: true,
        },
      },
    },
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
  plugins: ['import'],
  rules: {
    'import/namespace': ['error', { allowComputed: true }],
    'import/no-default-export': 'error',
  },
}
