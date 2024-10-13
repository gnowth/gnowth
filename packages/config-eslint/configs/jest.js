module.exports = {
  extends: ['plugin:jest/all'],
  plugins: ['jest'],
  rules: { 'jest/max-expects': ['error', { max: 10 }] },
}
