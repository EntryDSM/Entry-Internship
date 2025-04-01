// 지원서 조회
export const fetchApplicantDetails = async (reportId: number) => {
  const reponse = await fetch(`/reports/${reportId}`);
  if (!reponse.ok) {
    throw new Error('지원서 조회 실패ㅜ');
  }
  return reponse.json();
};
