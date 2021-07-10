const javascript = require('./javascript-react')
const typescript = require('./typescript-react')

module.exports = {
  ...javascript,

  overrides: [
    {
      ...typescript,
      files: ['*.ts', '*.tsx'],
    },
  ],
}
