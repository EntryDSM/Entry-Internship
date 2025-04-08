import { instance } from './instance';
import { useCookies } from 'react-cookie';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { EditSupport } from '../pages/EditSupport';

// 지원서 수정 API
const editSupport = async (supportData: EditSupport, token: string) => {
  const { data } = await instance.put('/applications', supportData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return data;
};

// 지원서 수정 훅
export const useEditSupport = () => {
  const [cookies] = useCookies(['accessToken']);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supportData: EditSupport) =>
      editSupport(supportData, cookies.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      console.log('✅ 지원서 수정 성공!');
      alert('지원서가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('❌ 지원서 수정 실패:', error);
      alert('지원서를 수정하는 데 실패했습니다.');
    },
  });
};

// 지원서 상세 정보 가져오기
const fetchSupportDetail = async (
  applicationId: number,
  token: string
) => {
  const { data } = await instance.get(
    `/applications/${applicationId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// 지원서 상세 정보 조회 훅
export const useSupportDetailQuery = (applicationId: number) => {
  const [cookies] = useCookies(['accessToken']);

  const query = useQuery({
    queryKey: ['supportDetail', applicationId],
    queryFn: () => fetchSupportDetail(applicationId, cookies.accessToken),
    enabled: !!applicationId,
  });

  useEffect(() => {
    if (query.isSuccess) {
      console.log(`✅ 지원서 #${applicationId} 상세 정보 불러오기 성공:`, query.data);
    } else if (query.isError) {
      console.error(
        `❌ 지원서 #${applicationId} 상세 정보 불러오기 실패:`,
        query.error
      );
    }
  }, [
    query.data,
    query.status,
    query.error,
    query.isSuccess,
    query.isError,
    applicationId,
  ]);

  return query;
};
