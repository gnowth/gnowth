module.exports = {
  overrides: [
    {
      extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:testing-library/react'],
      files: ['**/__tests__/**/*.+(j|t)s?(x)', '**/?(*.)+(spec|test).+(j|t)s?(x)'],
      plugins: ['jest', 'testing-library'],
    },
  ],
}
