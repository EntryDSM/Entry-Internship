import styled from '@emotion/styled';
import { PostList } from '../components';
import { usePostAllApi } from '../apis';

export const JobStatus = () => {
  const { data: careerItems = [], isLoading, isError } = usePostAllApi();

  if (isLoading) {
    return (
      <JobStatusContainer>
        <div>데이터를 불러오는 중...</div>
      </JobStatusContainer>
    );
  }

  if (isError) {
    return (
      <JobStatusContainer>
        <div>데이터를 불러오는 데 실패했습니다.</div>
      </JobStatusContainer>
    );
  }

  return (
    <JobStatusContainer>
      {careerItems.length > 0 ? (
        <>
          {careerItems.map((post) => (
            <PostList
              key={post.noticeId}
              postName={post.title}
              keywords={post.keyWord}
            />
          ))}
        </>
      ) : (
        <div>공고가 없습니다.</div>
      )}
    </JobStatusContainer>
  );
};

const JobStatusContainer = styled.div`
  width: 100vw;
  height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding-top: 100px;
`;
