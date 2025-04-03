import { useQuery } from '@tanstack/react-query';
import { instance } from './instance';
import { useCookies } from 'react-cookie';

const fetchpostDetailApi = async (token: string, postId: number) => {
  const { data } = await instance.get(`/notice/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const postDetailApi = () => {
  const [cookies] = useCookies(['accessToken']);

  return useQuery({
    queryKey: ['postDetail'],
    queryFn: fetchpostDetailApi(cookies.accessToken),
    onSuccess: (data) => {
      console.log('✅ 데이터 불러오기 성공:', data);
    },
    onError: (error) => {
      console.error('❌ 데이터 불러오기 실패:', error);
      alert('데이터를 불러오는 데 실패했습니다.');
    },
  });
};
