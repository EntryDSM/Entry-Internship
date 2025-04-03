import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import { Plus } from './assets';

type ButtonType = {
  children?: string;
  onClick?: () => void;
  onChange?: () => void;
  isAdmin?: boolean;
};

export const Button = ({
  isAdmin,
  children,
  onClick,
  onChange,
}: ButtonType) => {
  return (
    <ButtonContainer
      isAdmin={isAdmin}
      type="button"
      onClick={onClick}
      onChange={onChange}
    >
      {children ? children : <Plus color="#ffffff" size={22} />}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<Pick<ButtonType, 'isAdmin'>>`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.extra.white};
  font-size: 25px;
  font-weight: 700;
  background-color: ${({ isAdmin }) =>
    isAdmin ? colors.green[500] : colors.orange[500]};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    
    background-color: ${({ isAdmin }) =>
      isAdmin ? colors.green[600] : colors.orange[600]};
  }
`;
