import type { Decorator, Preview } from '@storybook/react-vite';
import '@/tokens/colors.css';
import '@/tokens/typography.css';
import '@/tokens/spacing.css';
import { StrictMode } from 'react';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
    },
};

export const decorators: Decorator[] = [
    (Story) => (
        /** @ts-expect-error - TS17004: Cannot use JSX unless the --jsx flag is provided. - WebStorm Bug */
        <StrictMode>
            {/** @ts-expect-error TS17004: Cannot use JSX unless the --jsx flag is provided. - WebStorm Bug */}
            <Story />
        </StrictMode>
    ),
];

export default preview;
