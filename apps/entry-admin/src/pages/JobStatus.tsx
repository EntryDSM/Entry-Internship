import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { writeIcon } from '@entry/ui';
import { TitleBanner, NoticeListItem } from '../components/MainCareer';
import { useNoticesQuery } from '../apis';
import { useNavigate } from 'react-router-dom';

export const JobStatus = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useNoticesQuery();
  const careerItems = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
    ? data.content
    : [];

  console.log('최종 기업 목록:', careerItems);

  if (isLoading) {
    return (
      <MainContainer>
        <TitleBanner />
        <ContentContainer>
          <PageTitle>채용 공고</PageTitle>
          <LoadingMessage>데이터를 불러오는 중입니다...</LoadingMessage>
        </ContentContainer>
      </MainContainer>
    );
  }

  if (isError) {
    return (
      <MainContainer>
        <TitleBanner />
        <ContentContainer>
          <PageTitle>채용 공고</PageTitle>
          <ErrorMessage>데이터를 불러오는 데 실패했습니다.</ErrorMessage>
        </ContentContainer>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <TitleBanner />
      <ContentContainer>
        <PageTitle>채용 공고</PageTitle>
        {careerItems.length > 0 ? (
          <NoticeListContainer>
            {careerItems.map((post) => (
              <NoticeListItem
                key={post.noticeId}
                noticeId={post.noticeId}
                title={post.title}
                keyWord={post.keyWord}
              />
            ))}
          </NoticeListContainer>
        ) : (
          <EmptyMessage>공고가 없습니다.</EmptyMessage>
        )}
      </ContentContainer>
      <WriteButtonWrapper onClick={() => navigate('/admin/create-support')}>
        <img src={writeIcon} alt="✏️" />글 작성하기
      </WriteButtonWrapper>
    </MainContainer>
  );
};

const WriteButtonWrapper = styled.button`
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

const EmptyMessage = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.gray[600]};
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 40px;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.extra.error};
  text-align: center;
`;

const NoticeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PageTitle = styled.h2`
  font-size: 16px;
  color: #5d5d5d;
  margin-bottom: 25px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MainContainer = styled.div`
  width: 100vw;
  height: 86vh;
  overflow-x: hidden;
`;
