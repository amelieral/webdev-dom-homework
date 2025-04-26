import globals from 'globals';
import pluginJs from '@eslint/js';
import config from 'eslint-config-prettier';
import plugin from 'eslint-plugin-prettier/recommended';

export default [
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    config,
    {
        ...plugin,
        rules: {
            ...plugin.rules,
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    semi: true,
                    trailingComma: 'es5',
                    singleQuote: true,
                },
            ],
        },
    },
];
