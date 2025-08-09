import type { Meta, StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { useArgs } from 'storybook/preview-api';

import { type InputProps, InputSize } from '@/atoms/input/input.interfaces.ts';
import { Input } from '@/atoms/input/input.tsx';

const meta = {
    title: 'Atoms/Input',
    component: Input,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.values(InputSize),
        },
    },
    args: {
        label: 'Input',
        value: '',
        size: InputSize.SMALL,
        disabled: false,
        required: false,
        onChange: action('onChange'),
    },
} satisfies Meta<InputProps>;
export default meta;

export const Default: StoryFn<InputProps> = ({
    label,
    value,
    size,
    disabled,
    required,
    onChange,
}) => {
    const [, updateArgs] = useArgs();

    const handleChange = (value: string) => {
        updateArgs({ value });
        onChange(value);
    };

    return (
        <Input
            label={label}
            value={value}
            size={size}
            disabled={disabled}
            required={required}
            onChange={handleChange}
        />
    );
};
