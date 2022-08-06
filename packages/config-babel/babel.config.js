module.exports = (api) => ({
  presets: [
    ['@babel/env', api.env('test') ? { targets: { node: 'current' } } : {}],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'lodash',
  ],
})
