import { type ChangeEvent, type FC, useCallback } from 'react';

import type { InputProps } from '@/atoms/input/input.interfaces.ts';
import styles from '@/atoms/input/input.module.css';

export const Input: FC<InputProps> = ({
    label,
    value,
    size,
    disabled = false,
    required = false,
    onChange,
}) => {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange],
    );

    return (
        <label className={`${styles.base} ${styles[size]}`}>
            <span>
                {label}
                <span className={styles.required}>*</span>
            </span>
            <input
                type='text'
                value={value}
                required={required}
                disabled={disabled}
                onChange={handleChange}
            />
        </label>
    );
};
