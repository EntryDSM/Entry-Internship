import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors } from '@entry/design-token';
import { ImgStore } from '../components';
import { CarrerItem } from '../components';
import { useEffect, useState } from 'react';

export const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [datas, setDatas] = useState<
    {
      title: string;
      keyWord: string[];
      isFocusRecruit: boolean;
      isImportant: boolean;
    }[]
  >([
    {
      title: '피자 배달부 모집 ( 정규직 )',
      keyWord: ['개발', 'GO 언어'],
      isFocusRecruit: true,
      isImportant: true,
    },
    {
      title: '피자 배달부 모집 ( 정규직 )',
      keyWord: ['개발', 'GO 언어'],
      isFocusRecruit: false,
      isImportant: true,
    },
    {
      title: '피자 배달부 모집 ( 정규직 )',
      keyWord: ['개발', 'GO 언어'],
      isFocusRecruit: false,
      isImportant: true,
    },
    {
      title: '피자 배달부 모집 ( 정규직 )',
      keyWord: ['개발', 'GO 언어'],
      isFocusRecruit: false,
      isImportant: true,
    },
  ]);

  return (
    <MainContainer>
      <TitleContainer>
        <ImgStore name="TitleImg" width="100vw" height="300px" />
        <MentContainer>
          <Top>
            <LogoImg>
              <ImgStore name="LogoOrange" width="30px" />
            </LogoImg>
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
        {datas.map((data) => (
          <CarrerItem
            onClick={() => navigate('/post/1')}
            title={data.title}
            isFocusRecruit={data.isFocusRecruit}
            isImportant={data.isImportant}
            keyWord={data.keyWord}
          />
        ))}
      </CarrersContainer>
    </MainContainer>
  );
};

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
  color: ${colors.orange[500]};
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
