const javascript = require('./javascript')
const typescript = require('./typescript')

const typescriptOverride = { ...typescript, files: ['*.ts'] }
delete typescriptOverride.root

module.exports = {
  ...javascript,
  overrides: [typescriptOverride],
}
