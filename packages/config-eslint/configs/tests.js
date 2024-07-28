module.exports = {
  overrides: [
    {
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:testing-library/react',
        'plugin:jest-formatting/recommended',
      ],
      files: ['**/__tests__/**/*.+(j|t)s?(x)', '**/?(*.)+(spec|test).+(j|t)s?(x)'],
      plugins: ['jest', 'jest-formatting', 'testing-library'],
      rules: { 'sonarjs/no-duplicate-string': 'off' },
    },
  ],
}
