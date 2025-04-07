import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from './instance';
import { useCookies } from 'react-cookie';

const deletePost = async (noticeId: number, token: string): Promise<void> => {
  await instance.delete(`/notices/${noticeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const useDeletePostApi = () => {
  const [cookies] = useCookies(['accessToken']);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noticeId: number) => deletePost(noticeId, cookies.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postAll'] });
      console.log('공고 삭제 성공!');
    },
    onError(error) {
      console.error('공고 삭제 실패:', error);
      alert('공고를 삭제하는 데 실패했습니다.');
    },
  });
};
