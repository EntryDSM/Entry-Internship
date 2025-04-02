import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Label } from './Label';

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

export const Inputs = ({
  label,
  isWrite,
  placeholder,
  value,
  onKeyDown,
  onChange,
  onBlur,
  onCompositionEnd,
  onKeyUp,
}: InputType) => {
  return (
    <InputContainer>
      <Label label={label} isWrite={isWrite} placeholder={placeholder} />
      <Input
        type="text"
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
        onCompositionEnd={onCompositionEnd}
        onKeyUp={onKeyUp}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 14px;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid ${colors.gray[200]};
  border-radius: 12px;
  color: ${colors.gray[800]};
`;
