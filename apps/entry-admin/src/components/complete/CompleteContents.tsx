import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Check } from '@entry/ui';
import { colors } from '@entry/design-token';

type complete = {
  children?: string;
};

export const CompleteContents = ({ children }: complete) => {
  const navigate = useNavigate();

  const mainClick = () => {
    navigate('/');
  };
  return (
    <CompleteContainer>
      <CompleteContentsContainer>
        <Check />
        <CompleteMsg>{children}</CompleteMsg>
      </CompleteContentsContainer>
      <MainBtn type="button" onClick={mainClick}>
        메인으로
      </MainBtn>
    </CompleteContainer>
  );
};

const CompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
  align-items: center;
  margin-top: 100px;
`;

const CompleteContentsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 53px;
`;

const CompleteMsg = styled.div`
  color: ${colors.gray[900]};
  font-size: 24px;
  font-weight: 600;
`;

const MainBtn = styled.button`
  cursor: pointer;
  width: 250px;
  height: 60px;
  border-radius: 30px;
  background-color: ${colors.green[500]};
  color: ${colors.extra.white};
  font-size: 16px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
