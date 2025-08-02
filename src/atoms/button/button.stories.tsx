import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { type ButtonProps, ButtonSize, ButtonVariant } from '@/atoms/button/button.interfaces.ts';
import { Button } from '@/atoms/button/button.tsx';

const meta = {
    title: 'Atoms/Button',
    component: Button,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: Object.values(ButtonVariant),
        },
        size: {
            control: { type: 'select' },
            options: Object.values(ButtonSize),
        },
    },
} satisfies Meta<ButtonProps>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: StoryObj<Story> = {
    args: {
        label: 'Button',
        variant: ButtonVariant.INFO,
        size: ButtonSize.SMALL,
        disabled: false,
        onClick: action('onClick'),
    },
};
