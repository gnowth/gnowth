module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: { ecmaFeatures: { jsx: true } },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/jsx-sort-props': 'error',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: { react: { version: 'detect' } },
}
