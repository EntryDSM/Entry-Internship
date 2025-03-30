import styled from '@emotion/styled';
import { color } from '@entry/design-token';
import { Label } from './Label';

type TextAreaType = {
  isWrite?: boolean;
  placeholder?: string;
  label?: string;
  onChange?: () => void;
  value?: string;
};

export const TextAreas = ({
  label,
  isWrite,
  placeholder,
  onChange,
  value,
}: TextAreaType) => {
  return (
    <TextAreaContainer>
      <Label label={label} isWrite={isWrite} placeholder={placeholder} />
      <TextArea onChange={onChange} value={value} />
    </TextAreaContainer>
  );
};

const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 372px;
  padding: 20px 24px 0 24px;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid ${color.gray[200]};
  border-radius: 12px;
  color: ${color.gray[800]};
  resize: none;
`;
