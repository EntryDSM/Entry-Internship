import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { colors } from '@entry/design-token';
import { ImgStore } from '../components';
import { CarrerItem } from '../components';
import { useEffect, useState } from 'react';
import { postAllApi } from '../apis';

export const Post = () => {
  const navigate = useNavigate();

  const { data } = postAllApi();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [datas, setDatas] = useState<
    {
      title: string;
      keyWord: string[];
      focusRecruit: boolean;
      important: boolean;
      noticeId: string;
    }[]
  >([]);

  useEffect(() => {
    if (data) {
      setDatas(data);
      console.log('✅ dd:', data);
    }
  }, [data]);

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
        {datas.length > 0 ? (
          datas.map((data) => (
            <CarrerItem
              key={data.noticeId}
              onClick={() => navigate(`/post/${data.noticeId}`)}
              title={data.title}
              isFocusRecruit={data.focusRecruit}
              isImportant={data.important}
              keyWord={data.keyWord}
            />
          ))
        ) : (
          <div>채용 공고가 없습니다.</div>
        )}
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
