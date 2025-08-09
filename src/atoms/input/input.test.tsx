import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { InputSize } from '@/atoms/input/input.interfaces.ts';

import { Input } from './input';

const INPUT_SIZES = [InputSize.SMALL, InputSize.MEDIUM];

test.each(INPUT_SIZES)('%s size', (size) => {
    const screen = render(
        <Input
            label='test'
            value=''
            size={size}
            disabled={false}
            required={false}
            onChange={vi.fn()}
        />,
    );
    const input = screen.getByRole('textbox');

    expect(input).toBeVisible();
});

test('value', () => {
    const screen = render(
        <Input
            label='test'
            value=''
            size={InputSize.SMALL}
            disabled={false}
            required={false}
            onChange={vi.fn()}
        />,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveProperty('value', '');

    screen.rerender(
        <Input
            label='test'
            value='test'
            size={InputSize.SMALL}
            disabled={false}
            required={false}
            onChange={vi.fn()}
        />,
    );

    expect(input).toHaveProperty('value', 'test');
});

test('required', () => {
    const screen = render(
        <Input
            label='test'
            value=''
            size={InputSize.SMALL}
            disabled={false}
            required={true}
            onChange={vi.fn()}
        />,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveProperty('required', true);

    screen.rerender(
        <Input
            label='test'
            value=''
            size={InputSize.SMALL}
            disabled={false}
            required={false}
            onChange={vi.fn()}
        />,
    );

    expect(input).toHaveProperty('required', false);
});

test('change', async () => {
    const onChange = vi.fn();
    const screen = render(
        <Input
            label='test'
            value=''
            size={InputSize.SMALL}
            disabled={false}
            required={false}
            onChange={onChange}
        />,
    );
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'abc');

    expect(onChange).toHaveBeenNthCalledWith(1, 'a');
    expect(onChange).toHaveBeenNthCalledWith(2, 'b');
    expect(onChange).toHaveBeenNthCalledWith(3, 'c');
});

test('disable', async () => {
    const onChange = vi.fn();
    const screen = render(
        <Input
            label='test'
            value=''
            size={InputSize.SMALL}
            disabled={true}
            required={false}
            onChange={onChange}
        />,
    );
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');

    expect(onChange).toHaveBeenCalledTimes(0);
});
