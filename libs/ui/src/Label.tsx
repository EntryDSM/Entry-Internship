import styled from '@emotion/styled';
import { color } from '@entry/design-token';

type LabelType = {
  isWrite?: boolean;
  placeholder?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

export const Label = ({
  isWrite,
  placeholder,
  label,
  onChange,
  value,
}: LabelType) => {
  return (
    <div>
      {isWrite ? (
        <LabelInput
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      ) : (
        <LabelText>{label}</LabelText>
      )}
    </div>
  );
};

const LabelText = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${color.gray[800]};
`;

const LabelInput = styled.input`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${color.gray[800]};
  &::placeholder {
    color: ${color.gray[100]};
    font-size: 16px;
    font-weight: 500;
  }
  background-color: transparent;
`;
