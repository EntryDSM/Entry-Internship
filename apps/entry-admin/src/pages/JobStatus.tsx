import styled from '@emotion/styled';
import { useState } from 'react';
import { PostList } from '../components';

type PostType = {
  postName: string;
  keyword: string[];
};

export const JobStatus = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      postName: '피자 배달부 모집 ( 정규직 )',
      keyword: ['개발', 'Go언어', '백엔드'],
    },
    {
      postName: '과자 배달부 모집 ( 정규직 )',
      keyword: ['개발', 'Go언어', '프론트엔드'],
    },
    {
      postName: '피자 배달부 모집 ( 정규직 )',
      keyword: ['개발', 'Go언어', '백엔드'],
    },
  ]);

  return (
    <JobStatusContainer>
      {posts.length > 0 ? (
        <>
          {posts.map((post, index) => (
            <PostList
              key={index}
              postName={post.postName}
              keywords={post.keyword}
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
