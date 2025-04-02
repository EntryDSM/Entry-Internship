import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Check } from '@entry/ui';

type CheckType = {
  label?: string;
  isCheck?: boolean;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckContents = ({ label, isCheck, setIsCheck }: CheckType) => {
  const checkClick = () => {
    setIsCheck(!isCheck);
  };
  return (
    <Label>
      <CheckFakeContainer>
        <CheckBoxIcon isCheck={isCheck} onClick={checkClick} />
        <ImgContainer>
          <Check size={17} />
        </ImgContainer>
      </CheckFakeContainer>
      <CheckBox type="checkbox" />
      {label}
    </Label>
  );
};

const CheckBoxIcon = styled.div<{ isCheck: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${({ isCheck }) =>
    isCheck ? colors.gray[300] : colors.extra.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBox = styled.input`
  display: none;
`;
const Label = styled.label`
  display: flex;
  gap: 12px;
  font-size: 18px;
  font-weight: 400;
  color: ${colors.gray[400]};
`;

const ImgContainer = styled.div`
  pointer-events: none;
  position: absolute;
  top: 2px;
  left: 2.5px;
`;

const CheckFakeContainer = styled.div`
  position: relative;
  width: 22px;
  height: 22px;
`;
