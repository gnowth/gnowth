const javascript = require('./javascript-react')
const json = require('./json')
const markdown = require('./markdown-react')
const typescript = require('./typescript-react')

module.exports = {
	...javascript,

	overrides: [
		{
			...json,
			files: ['*.json'],
		},
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
