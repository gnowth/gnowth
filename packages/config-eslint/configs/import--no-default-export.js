module.exports = {
  overrides: [
    {
      // https://github.com/isaacs/minimatch
      files: [
        '**/src/app-experimental/**/*',
        '**/src/app/**/*',
        '**/src/pages/**/*',
        '**/*.stories.*',
        '**/mock/mock-*.js',
        '**/playwright.config.*',
      ],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
  plugins: ['import'],
  rules: { 'import/no-default-export': 'error' },
}
