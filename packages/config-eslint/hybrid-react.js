const javascript = require('./javascript-react')
const markdown = require('./markdown-react')
const typescript = require('./typescript-react')

const typescriptOverride = { ...typescript, files: ['*.ts', '*.tsx'] }
delete typescriptOverride.root

const markdownOverride = { ...markdown, files: ['*.mdx'] }
delete markdownOverride.root

module.exports = {
  ...javascript,
  overrides: [markdownOverride, typescriptOverride],
}
