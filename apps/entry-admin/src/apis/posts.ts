// 공고 전체 조회
export const fetchAllPosts = async () => {
  const reponse = await fetch(`/notice`);
  if (!reponse.ok) {
    throw new Error('공고 전체 조회 실패ㅜ');
  }
  return reponse.json();
};

// 공고 상세 조회
export const fetchPostDetails = async (noticeId: number) => {
  const reponse = await fetch(`/notice/${noticeId}`);
  if (!reponse.ok) {
    throw new Error('공고 상세 조회 실패ㅜ');
  }
  return reponse.json();
};
