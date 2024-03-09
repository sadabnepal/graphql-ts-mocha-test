/* eslint-env node */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'args': 'all',
                'argsIgnorePattern': '^_',
                'caughtErrors': 'all',
                'caughtErrorsIgnorePattern': '^_',
                'destructuredArrayIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'ignoreRestSiblings': true
            }
        ],
        'linebreak-style': [
            'error'
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    }
};