module.exports = {
	env: {
		browser: true,
		es6: true,
		mongo: true,
		node: true,
		serviceworker: true,
		worker: true,
	},

	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:eslint-comments/recommended',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:mdx/recommended',
		'plugin:promise/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],

	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true,
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	plugins: [
		'@typescript-eslint',
		'eslint-comments',
		'import',
		'jest',
		'jsx-a11y',
		'mdx',
		'prettier',
		'promise',
		'react',
		'react-hooks',
	],

	settings: {
		'import/extensions': ['.md', '.mdx'],
		'mdx/code-blocks': true,
		'mdx/language-mapper': {},
	},

	rules: {
		'prettier/prettier': 'error',

		/** Note: React is no longer required if babel is provided
		 *	Link: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
		 */
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},
}
