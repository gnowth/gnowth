module.exports = {
  env: {
    browser: true,
    es6: true,
    mongo: true,
    node: true,
    serviceworker: true,
    worker: true,
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    // Note: the following config will add typechecking in eslint
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: '**/tsconfig.json',
  },

  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'import',
    'jest',
    'jsx-a11y',
    'prettier',
    'promise',
    'react',
    'react-hooks',
    'testing-library',
  ],

  settings: {
    'import/extensions': ['.ts', '.tsx', '.json'],
  },

  rules: {
    'prettier/prettier': 'error',

    // Note: React is no longer required if babel is provided
    // Link: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },

  overrides: [
    {
      files: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:testing-library/react'],
    },
  ],
}
