import { useMutation } from '@tanstack/react-query';
import { instance } from './instance';
import { useCookies } from 'react-cookie';

export const githubLoginApi = () => {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  return useMutation({
    mutationFn: async () => {
      const response = await instance.get('/api/github/auth');
      return response.request?.responseURL || response.config.url;
    },
    onSuccess: (url) => {
      console.log('성공');
      console.log('로그인 URL:', url);
      const params = new URL(url).searchParams;

      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');
      const accessTokenExpiration = params.get('accessTokenExpiration');
      const refreshTokenExpiration = params.get('refreshTokenExpiration');

      if (
        accessToken &&
        refreshToken &&
        accessTokenExpiration &&
        refreshTokenExpiration
      ) {
        console.log('토큰 정상 추출:', accessToken, refreshToken);

        setCookie('accessToken', accessToken, {
          expires: new Date(accessTokenExpiration),
          path: '/',
        });

        setCookie('refreshToken', refreshToken, {
          expires: new Date(refreshTokenExpiration),
          path: '/',
        });
      } else {
        console.log('토큰을 찾을 수 없음');
      }
    },
    onError: (error) => {
      console.error('로그인 오류:', error);
    },
  });
};
