import type { FC } from 'react';

import type { ButtonProps } from '@/atoms/button/button.interfaces.ts';
import styles from '@/atoms/button/button.module.css';

export const Button: FC<ButtonProps> = ({ label, variant, size, disabled = false, onClick }) => {
    return (
        <button
            className={`${styles.base} ${styles[variant]} ${styles[size]}`}
            disabled={disabled}
            onClick={onClick}
        >
            <p>{label}</p>
        </button>
    );
};
