import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { CareerItemProps } from '@entry/types';

const fetchPostAllApi = async (token: string): Promise<CareerItemProps[]> => {
  const { data } = await instance.get('/notices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return Array.isArray(data) ? data : data.data || [];
};

export const usePostAllApi = (): UseQueryResult<CareerItemProps[], Error> => {
  const [cookies] = useCookies(['accessToken']);

  const query = useQuery({
    queryKey: ['postAll'],
    queryFn: () => fetchPostAllApi(cookies.accessToken),
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log('데이터 불러오기 성공:', query.data);
    } else if (query.isError) {
      console.error('데이터를 불러오는데 실패함:', query.error);
      alert('데이터를 불러오는데 실패하였습니다.');
    }
  }, [query.status, query.data, query.error, query.isSuccess, query.isError]);

  return query;
};
