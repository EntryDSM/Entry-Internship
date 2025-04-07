import { instance } from './instance';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const logoutApi = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  return useMutation({
    mutationFn: async () => {
      const response = await instance.post('/api/google/auth/logout', {
        accessToken: accessToken,
      });
      return response;
    },
    onSuccess: () => {
      removeCookie('accessToken', { path: '/' });
      navigate('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
};
