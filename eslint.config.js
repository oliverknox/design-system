import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';

export default ts.config(
    [
        globalIgnores(['dist']),
        {
            files: ['**/*.{ts,tsx}'],
            extends: [
                js.configs.recommended,
                ts.configs.recommended,
                reactHooks.configs['recommended-latest'],
                reactRefresh.configs.vite,
                prettierConfig,
                importX.flatConfigs.recommended,
                importX.flatConfigs.typescript,
            ],
            rules: {
                'import-x/order': [
                    'error',
                    {
                        groups: [
                            'builtin',
                            'external',
                            'internal',
                            ['parent', 'sibling', 'index'],
                            'object',
                        ],
                        'newlines-between': 'always', // enforce a blank line between groups
                        alphabetize: {
                            order: 'asc', // Sort imports alphabetically
                            caseInsensitive: true,
                        },
                    },
                ],
            },
            languageOptions: {
                ecmaVersion: 2020,
                globals: globals.browser,
            },
        },
    ],
    storybook.configs['flat/recommended'],
);
