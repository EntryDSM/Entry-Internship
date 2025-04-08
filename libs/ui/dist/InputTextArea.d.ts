type InputTextAreaType = {
    label: string;
    valueInput?: string;
    valueArea?: string;
    inputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    areaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export declare const InputTextArea: ({ label, valueArea, valueInput, inputChange, areaChange, }: InputTextAreaType) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=InputTextArea.d.ts.map