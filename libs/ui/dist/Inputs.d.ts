type InputType = {
    isWrite?: boolean;
    placeholder?: string;
    label?: string;
    value?: string;
    onKeyDown?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onCompositionEnd?: () => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
export declare const Inputs: ({ label, isWrite, placeholder, value, onKeyDown, onChange, onBlur, onCompositionEnd, onKeyUp, }: InputType) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Inputs.d.ts.map