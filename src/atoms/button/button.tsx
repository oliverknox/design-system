import { type FC, useCallback } from 'react';

import type { ButtonProps } from '@/atoms/button/button.interfaces.ts';
import styles from '@/atoms/button/button.module.css';

export const Button: FC<ButtonProps> = ({ label, variant, size, disabled = false, onClick }) => {
    const handleClick = useCallback(() => {
        onClick();
    }, [onClick]);

    return (
        <button
            className={`${styles.base} ${styles[variant]} ${styles[size]}`}
            disabled={disabled}
            onClick={handleClick}
        >
            <p>{label}</p>
        </button>
    );
};
