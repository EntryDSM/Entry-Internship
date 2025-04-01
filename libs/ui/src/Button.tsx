import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import { Plus } from './assets';

type ButtonType = {
  userType?: 'admin' | 'user';
  children?: string;
  onClick?: () => void;
  onChange?: () => void;
};

export const Button = ({
  userType,
  children,
  onClick,
  onChange,
}: ButtonType) => {
  return (
    <ButtonContainer
      type="button"
      userType={userType}
      onClick={onClick}
      onChange={onChange}
    >
      {children ? children : <Plus color={colors.gray[50]} size={22} />}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<Pick<ButtonType, 'userType'>>`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.extra.white};
  font-size: 25px;
  font-weight: 700;
  background-color: ${({ userType }) =>
    userType === 'admin' ? colors.green[500] : colors.orange[500]};
  border-radius: 20px;
  &:hover {
    transition: 0.4s ease-in-out;
    background-color: ${({ userType }) =>
      userType === 'admin' ? colors.green[600] : colors.orange[600]};
  }
`;
