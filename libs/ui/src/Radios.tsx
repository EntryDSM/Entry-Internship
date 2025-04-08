import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Check } from './assets';
import { Label } from './Label';

type RadioOption = {
  label: string;
  name: string;
};

type RadioItemType = {
  radioLabel?: string;
  radioPlaceholder?: string;
  name?: string;
  userType?: 'admin' | 'user';
  onChange?: (value: string) => void;
  onRadioChange?: (selectedValue: string) => void;
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

const RadioItem = ({
  radioLabel,
  radioPlaceholder,
  name,
  userType = 'admin',
  onChange,
  onRadioChange,
}: RadioItemType) => {
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
  datas,
  onRadioChange,
}: RadiosProps) => {
  return (
    <RadioContainer>
      <Label label={label} placeholder={placeholder} />
      <ContentContainer>
        {datas.map((data) => (
          <RadioItem
            key={data.name}
            radioPlaceholder={radioPlaceholder}
            userType={userType}
            radioLabel={data.label}
            name={name}
            onRadioChange={onRadioChange}
          />
        ))}
      </ContentContainer>
    </RadioContainer>
  );
};

const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 30px;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 46px;
  flex-wrap: wrap;
  align-items: center;
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

const Radio = styled.input<{ userType?: 'admin' | 'user' }>`
  width: 25px;
  height: 25px;
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
