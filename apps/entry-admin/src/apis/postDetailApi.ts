import { instance } from './instance';
import { CareerItemDetailProps } from '@entry/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const fetchPostDetails = async (
  noticeId: number,
  token: string
): Promise<CareerItemDetailProps> => {
  const { data } = await instance.get<CareerItemDetailProps>(
    `/notices/${noticeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const usePostDetailApi = (noticeId: number) => {
  const [cookies] = useCookies(['accessToken']);

  const query = useQuery<CareerItemDetailProps, Error>({
    queryKey: ['postDetail', noticeId],
    queryFn: () => fetchPostDetails(noticeId, cookies.accessToken),
    enabled: !!noticeId,
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log(`공고 #${noticeId} 상세 데이터 불러오기 성공!`, query.data);
    } else if (query.isError) {
      console.error(
        `공고 #${noticeId} 상세 데이터 불러오기 실패..`,
        query.error
      );
      alert('공고 상세 정보를 불러오는데 실패하였습니다.');
    }
  }, [
    query.data,
    query.status,
    query.error,
    query.isSuccess,
    query.isError,
    noticeId,
  ]);

  return query;
};
