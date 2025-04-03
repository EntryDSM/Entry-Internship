import { instance } from './instance';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const logoutApi = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['accessToken']);

  return useMutation({
    mutationFn: async () => {
      const response = await instance.post(
        '/api/google/auth/logout',
        { data: cookies.accessToken },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      removeCookie('accessToken', { path: '/' });
      navigate('/');
      alert('로그아웃 성공');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 실패. 다시 시도해주세요.');
    },
  });
};
