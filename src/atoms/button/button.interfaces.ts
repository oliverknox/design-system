export enum ButtonVariant {
    INFO = 'info',
    POSITIVE = 'positive',
    WARNING = 'warning',
    DANGER = 'danger',
}

export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export interface ButtonProps {
    label: string;
    variant: ButtonVariant;
    size: ButtonSize;
    disabled?: boolean;
    onClick: () => void;
}
