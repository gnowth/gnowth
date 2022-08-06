// DEBT: to check if all plugins/presets are compatible and explore preset for mdx
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
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:mdx/recommended',
    'plugin:react/recommended',
    'prettier',
  ],

  parser: 'eslint-mdx',

  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['eslint-comments', 'import', 'jsx-a11y', 'mdx', 'prettier', 'react'],

  settings: {
    'import/extensions': ['.md', '.mdx'],
    'mdx/code-blocks': true,
    'mdx/language-mapper': {},
  },

  rules: {
    'prettier/prettier': 'error',

    /** Note: React is no longer required if babel is provided
     *  Link: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
     */
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
