module.exports = {
  overrides: [
    {
      extends: ['./jest', './jest-formatting', './testing-library'],
      files: ['**/__tests__/**/*.+(j|t)s?(x)', '**/?(*.)+(spec|test).+(j|t)s?(x)'],
      plugins: ['testing-library'],
      rules: { 'sonarjs/no-duplicate-string': 'off' },
    },
  ],
}
