import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { ButtonSize, ButtonVariant } from '@/atoms/button/button.interfaces';

import { Button } from './button';

const BUTTON_VARIANTS = [
    ButtonVariant.INFO,
    ButtonVariant.POSITIVE,
    ButtonVariant.WARNING,
    ButtonVariant.DANGER,
];

const BUTTON_SIZES = [ButtonSize.SMALL, ButtonSize.MEDIUM, ButtonSize.LARGE];

test.each(BUTTON_VARIANTS)('%s variant', (variant) => {
    const screen = render(
        <Button
            label='test'
            variant={variant}
            size={ButtonSize.SMALL}
            disabled={false}
            onClick={vi.fn()}
        />,
    );
    const button = screen.getByRole('button');

    expect(button).toBeVisible();
});

test.each(BUTTON_SIZES)('%s variant', (size) => {
    const screen = render(
        <Button
            label='test'
            variant={ButtonVariant.INFO}
            size={size}
            disabled={false}
            onClick={vi.fn()}
        />,
    );
    const button = screen.getByRole('button');

    expect(button).toBeVisible();
});

test('click', async () => {
    const onClick = vi.fn();
    const screen = render(
        <Button
            label='test'
            variant={ButtonVariant.INFO}
            size={ButtonSize.SMALL}
            disabled={false}
            onClick={onClick}
        />,
    );
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
});

test('disable', async () => {
    const onClick = vi.fn();
    const screen = render(
        <Button
            label='test'
            variant={ButtonVariant.INFO}
            size={ButtonSize.SMALL}
            disabled={true}
            onClick={onClick}
        />,
    );
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
});
