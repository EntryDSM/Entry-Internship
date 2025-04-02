import { useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { EditSupport } from '@entry/types';
import { instance } from './instance';

export const useEditSupport = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();

  return useMutation({
    mutationFn: async (editData: EditSupport) =>
      await instance.patch(`/notice/${noticeId}`, editData),
    onSuccess: () => {
      navigate('/edited');
    },
    onError: () => {
      alert('수정이 되지 않았습니다.');
    },
  });
};
