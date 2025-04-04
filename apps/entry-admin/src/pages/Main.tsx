import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { writeIcon } from '@entry/ui';
import { CareerItemProps } from '@entry/types';
import { CareerItem, TitleBanner } from '../components';
import { fetchAllPosts } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const Main = () => {
  const {
    data: careerItems = [],
    isLoading,
    error,
  } = useQuery<CareerItemProps[]>({
    queryKey: ['careerItems'],
    queryFn: fetchAllPosts,
    retry: false,
    gcTime: 0,
  });

  if (error) {
    return <div>공고를 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  return (
    <MainContainer>
      <TitleBanner />
      <CarrersContainer>
        <CarrerTitle>채용 공고</CarrerTitle>
        {careerItems.length > 0 ? (
          careerItems.map((item) => (
            <CareerItem
              key={item.noticeId}
              noticeId={item.noticeId}
              title={item.title}
              isFocusRecruit={item.isFocusRecruit}
              isImportant={item.isImportant}
              keyWord={item.keyWord}
            />
          ))
        ) : (
          <NoCareersMessage>현재 공고가 없습니다.</NoCareersMessage>
        )}
      </CarrersContainer>
      <WriteButton />
    </MainContainer>
  );
};

const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <WriteButtonField onClick={() => navigate('/create-support')}>
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
