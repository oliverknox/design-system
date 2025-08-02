import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';


import packageJson from './package.json';

const dirname =
    typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react(), dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true })],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: packageJson.name,
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                assetFileNames: (assetInfo) => {
                    const [name] = assetInfo.names;
                    if (name.endsWith('.css')) {
                        return 'index.css';
                    }
                    return 'assets/[name][extname]';
                },
            },
        },
    },
    css: {
        modules: {
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            localsConvention: 'camelCaseOnly',
        },
    },
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, '.storybook'),
                    }),
                ],
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: 'playwright',
                        instances: [
                            {
                                browser: 'chromium',
                            },
                        ],
                    },
                    setupFiles: ['.storybook/vitest.setup.ts'],
                },
            },
            {
                test: {
                    environment: 'jsdom',
                    setupFiles: ['vitest.setup.ts'],
                },
                resolve: {
                    alias: {
                        '@': resolve(__dirname, './src'),
                    },
                },
            },
        ],
    },
});
