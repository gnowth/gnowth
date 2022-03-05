const javascript = require('./javascript')
const typescript = require('./typescript')

module.exports = {
	...javascript,

	overrides: [
		{
			...typescript,
			files: ['*.ts'],
		},
	],
}
