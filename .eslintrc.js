module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',

	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 13,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint',
		'unused-imports'
	],
	'rules': {
		'indent': 'off',
		'@typescript-eslint/indent': [
			'error',
			'tab'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-await-in-loop': 'error',
		'no-unreachable': 'error',
		'object-curly-spacing': ['error', 'always'],
		'camelcase': 'error',
		'curly': ['error', 'all'],
		'jsx-quotes': ['error', 'prefer-single'],
		'space-before-blocks': ['error', 'always'],
		'nonblock-statement-body-position': ['error', 'below'],
		'brace-style': ['error', '1tbs'],
		'keyword-spacing': 'error',
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': 'warn',
		'no-unused-vars': 'off',
		'max-len': ['error', {
			'code': 100
		}],
		'eqeqeq': 'warn',
		'arrow-spacing': 'error'
	}
};
