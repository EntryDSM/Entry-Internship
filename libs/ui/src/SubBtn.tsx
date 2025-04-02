import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import { Plus } from './assets';

type ButtonType = {
  userType?: 'admin' | 'user';
  children?: string;
  onClick?: () => void;
  isBlocked?: boolean;
};

export const SubBtn = ({
  userType,
  children,
  onClick,
  isBlocked,
}: ButtonType) => {
  return (
    <ButtonContainer
      isBlocked={isBlocked}
      type="button"
      userType={userType}
      onClick={onClick}
    >
      {children ? children : <Plus color={colors.gray[50]} size={13} />}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<
  Pick<ButtonType, 'userType' | 'isBlocked'>
>`
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  cursor: pointer;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.extra.white};
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ userType }) =>
    userType === 'admin' ? colors.green[500] : colors.orange[500]};
  border-radius: 10px;
`;
