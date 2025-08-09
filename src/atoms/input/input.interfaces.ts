export enum InputSize {
    SMALL = 'small',
    MEDIUM = 'medium',
}

export interface InputProps {
    label: string;
    value: string;
    size: InputProps;
    disabled?: boolean;
    required?: boolean;
    onChange: (text: string) => void;
}
