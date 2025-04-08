import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { writeIcon } from '@entry/ui';
import { CareerItem, TitleBanner } from '../components';
import { useNoticesQuery } from '../apis';
import { useEffect, useState } from 'react';

export const Main = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useNoticesQuery();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      setNotices(data);
    } else if (data && Array.isArray(data.content)) {
      setNotices(data.content);
    } else {
      console.log('데이터 형식이 예상과 다릅니다:', data);
      setNotices([]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <MainContainer>
        <TitleBanner />
        <CarrersContainer>
          <CarrerTitle>채용 공고</CarrerTitle>
          <LoadingMessage>데이터를 불러오는 중입니다...</LoadingMessage>
        </CarrersContainer>
      </MainContainer>
    );
  }

  if (isError) {
    return (
      <MainContainer>
        <TitleBanner />
        <CarrersContainer>
          <CarrerTitle>채용 공고</CarrerTitle>
          <NoCareersMessage>
            데이터를 불러오는 중 오류가 발생했습니다.
          </NoCareersMessage>
        </CarrersContainer>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <TitleBanner />
      <CarrersContainer>
        <CarrerTitle>채용 공고</CarrerTitle>
        {notices.length > 0 ? (
          notices.map((notice) => (
            <CareerItem
              key={notice.noticeId}
              noticeId={notice.noticeId}
              title={notice.title}
              isFocusRecruit={notice.focusRecruit}
              isImportant={notice.important}
              keyWord={notice.keyWord}
            />
          ))
        ) : (
          <div>채용 공고가 없습니다.</div>
        )}
      </CarrersContainer>
      <WriteButton />
    </MainContainer>
  );
};

const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <WriteButtonField onClick={() => navigate('/admin/create-support')}>
      <img src={writeIcon} alt="✏️" />글 작성하기
    </WriteButtonField>
  );
};

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
`;

const NoCareersMessage = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.gray[600]};
  text-align: center;
`;

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
  z-index: 500;

  &:hover {
    background-color: #229a59;
  }

  img {
    width: 20px;
    height: 20px;
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

const MainContainer = styled.div`
  width: 100vw;
  height: 86vh;
`;
