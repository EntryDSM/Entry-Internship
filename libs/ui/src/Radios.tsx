import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Check } from './assets';
import { Label } from './Label';

type RadioType = {
  userType?: 'admin' | 'user';
  placeholder?: string;
  label?: string;
  radioLabel?: string;
  radioPlaceholder?: string;
  name?: string;
  datas?: object[];
  setAddRadio: React.Dispatch<React.SetStateAction<RadioItemType[]>>;
  addRadio?: object[];
  onRadioChange?: () => void;
};

type RadioItemType = {
  userType?: 'admin' | 'user';
  radioPlaceholder?: string;
  radioLabel?: string;
  name?: string;
  onChange?: (e: string) => void;
};

const RadioItem = ({
  radioPlaceholder,
  userType = 'admin',
  radioLabel,
  name,
  onChange,
  onRadioChange,
}: RadioItemType & { onRadioChange?: (selectedValue: string) => void }) => {
  return (
    <RadioItemContainer>
      <RadioFakeContainer>
        <Radio
          type="radio"
          userType={userType}
          name={name}
          onChange={() => onRadioChange?.(radioLabel || '')}
        />
        <ImgContainer>
          <Check />
        </ImgContainer>
      </RadioFakeContainer>
      <Label
        placeholder={radioPlaceholder}
        label={radioLabel}
        onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
      />
    </RadioItemContainer>
  );
};

export const Radios = ({
  label,
  placeholder,
  userType,
  radioPlaceholder,
  name,
  setAddRadio,
  datas = [],
  onRadioChange,
}: RadioType) => {
  const addRadioClick = () => {
    setAddRadio((prevAddRadio) => [
      ...prevAddRadio,
      { radioPlaceholder, userType, radioLabel: '', value: '' },
    ]);
  };

  const handleRadioClick = (index: number, value: string) => {
    setAddRadio((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value } : item))
    );
  };

  const handleDataRadioChange = (selectedValue: string) => {
    onRadioChange?.(selectedValue);
  };

  return (
    <RadioContainer>
      <Label label={label} placeholder={placeholder} />
      <ContentContainer>
        {datas.map((data) => (
          <RadioItem
            radioPlaceholder={radioPlaceholder}
            userType={userType}
            radioLabel={data.label}
            name={name}
            onRadioChange={handleDataRadioChange}
          />
        ))}
      </ContentContainer>
    </RadioContainer>
  );
};
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 46px;
  flex-wrap: wrap;
  align-items: center;
`;

const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 30px;
`;

const Radio = styled.input<Pick<RadioType, 'userType'>>`
  width: 25px;
  height: 25px;
  padding-left: 24px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 50%;
  appearance: none;
  box-shadow: 0 0 0 1px ${colors.gray[600]};
  &:checked {
    box-shadow: 0 0 0 1.6px
      ${({ userType }) =>
        userType === 'admin' ? colors.green[500] : colors.orange[500]};
    background-color: ${({ userType }) =>
      userType === 'admin' ? colors.green[500] : colors.orange[500]};
  }
`;

const RadioItemContainer = styled.div`
  width: 128px;
  display: flex;
  gap: 14px;
  align-items: center;
`;

const RadioFakeContainer = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
`;

const ImgContainer = styled.div`
  position: absolute;
  top: 1.2px;
  left: 1.2px;
  pointer-events: none;
`;
