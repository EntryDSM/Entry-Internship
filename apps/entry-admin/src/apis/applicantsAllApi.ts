import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { ReportInfo } from '@entry/types';

const fetchApplicantsApi = async (token: string): Promise<ReportInfo[]> => {
  const { data } = await instance.get('/reports', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return Array.isArray(data) ? data : [];
};

export const useApplicantsApi = (): UseQueryResult<ReportInfo[], Error> => {
  const [cookies] = useCookies(['accessToken']);

  const query = useQuery({
    queryKey: ['applicants'],
    queryFn: () => fetchApplicantsApi(cookies.accessToken),
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log('지원자 데이터 불러오기 성공:', query.data);
    } else if (query.isError) {
      console.error('지원자 데이터를 불러오는데 실패함:', query.error);
      alert('지원자 데이터를 불러오는데 실패하였습니다.');
    }
  }, [query.status, query.data, query.error, query.isSuccess, query.isError]);

  return query;
};
