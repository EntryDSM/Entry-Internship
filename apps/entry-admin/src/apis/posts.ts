// 공고 삭제
export const fetchDeletePosts = async (noticeId: number) => {
  const response = await fetch(`/notice/${noticeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('공고 삭제 실패ㅜ');
  }
  return response.json();
};
