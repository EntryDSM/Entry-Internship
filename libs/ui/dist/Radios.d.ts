type RadioOption = {
    label: string;
    name: string;
};
type RadiosProps = {
    label: string;
    placeholder?: string;
    userType?: 'admin' | 'user';
    radioPlaceholder?: string;
    name: string;
    datas: RadioOption[];
    onRadioChange?: (selectedValue: string) => void;
};
export declare const Radios: ({ label, placeholder, userType, radioPlaceholder, name, datas, onRadioChange, }: RadiosProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Radios.d.ts.map