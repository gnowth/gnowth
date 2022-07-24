module.exports = (api) => ({
  presets: [
    api.env('test') ? ['@babel/env', { targets: { node: 'current' } }] : '@babel/env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'lodash',
  ],
})
