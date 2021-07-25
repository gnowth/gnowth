const javascript = require('./javascript-react')
const markdown = require('./markdown-react')
const typescript = require('./typescript-react')

module.exports = {
  ...javascript,

  overrides: [
    {
      ...markdown,
      files: ['*.mdx'],
    },
    {
      ...typescript,
      files: ['*.ts', '*.tsx'],
    },
  ],
}
