import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors } from '@entry/design-token';
import { ImgStore } from '@entry/ui';
import { IconStore } from '@entry/ui';
import { CarrerItem } from '../components';

export const Main = () => {
  return (
    <MainContainer>
      <TitleContainer>
        <ImgStore name="TitleImg" width="100vw" height="300px" />
        <MentContainer>
          <Top>
            <TopMent>
              <There>Entry</There>
              <DSM>DSM</DSM>
              <There>에서</There>
            </TopMent>
          </Top>
          <BottomMent>다음과 같은 인재들을 채용합니다.</BottomMent>
        </MentContainer>
      </TitleContainer>
      <CarrersContainer>
        <CarrerTitle>채용 공고</CarrerTitle>

        <CarrerItem />
        <CarrerItem />
        <CarrerItem />
        <CarrerItem />
        <CarrerItem />
      </CarrersContainer>
      <WriteButton />
    </MainContainer>
  );
};

const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <WriteButtonField onClick={() => navigate('/create-support')}>
      <IconStore name="Write" width="20px" height="20px" />글 작성하기
    </WriteButtonField>
  );
};

const WriteButtonField = styled.button`
  position: fixed;
  bottom: 50px;
  right: 200px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #2ac975;
  border-radius: 100px;
  color: white;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #229a59;
  }
`;

const CarrersContainer = styled.div`
  max-width: 1200px;
  margin: 0 20%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CarrerTitle = styled.div`
  font-size: 16px;
  color: #5d5d5d;
  margin-bottom: 25px;
`;

const DSM = styled.div`
  font-size: 30px;
  color: ${colors.green[500]};
  padding: 0 5px 0 0;
`;

const There = styled.div`
  color: white;
  font-size: 30px;
`;

const Top = styled.div`
  display: flex;
`;

const TopMent = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  margin-right: 10px;
  transform: translateY(5px);
`;

const BottomMent = styled.div`
  color: white;
  font-size: 30px;
  margin-top: 16px;
`;

const MentContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 15%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const TitleContainer = styled.div`
  position: relative;
`;

const MainContainer = styled.div`
  width: 100vw;
  height: 86vh;
`;
