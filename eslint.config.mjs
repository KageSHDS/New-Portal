// @ts-check

// import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(tseslint.configs.recommended, {
	rules: {
		'@typescript-eslint/no-require-imports': "off",
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': "off",
	},
})

