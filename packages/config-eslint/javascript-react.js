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
		'eslint:recommended',
		'plugin:eslint-comments/recommended',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:promise/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],

	// parser: '@babel/eslint-parser',

	parserOptions: {
		ecmaFeatures: {
			impliedStrict: true,
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	plugins: [
		'eslint-comments',
		'import',
		'jest',
		'jsx-a11y',
		'prettier',
		'promise',
		'react',
		'react-hooks',
		'testing-library',
	],

	settings: {
		'import/extensions': ['.js', '.jsx', '.json'],
		jest: { version: '27.0.6' },
		react: { version: '17.0.2' },
	},

	rules: {
		'prettier/prettier': 'error',

		/** Note: React is no longer required if babel is provided
		 *	Link: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
		 */
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},

	overrides: [
		{
			files: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
			extends: ['plugin:jest/recommended', 'plugin:jest/style', 'plugin:testing-library/react'],
		},
	],
}
