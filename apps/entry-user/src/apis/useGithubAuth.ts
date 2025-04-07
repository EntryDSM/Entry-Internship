import { useCookies } from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import { instance } from './instance';

interface AuthResponse {
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
  refreshTokenExpiration: string;
}

type AuthResult =
  | { type: 'auth'; data: AuthResponse }
  | { type: 'not_auth'; message: string };

export const useGithubAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  // 토큰 저장 함수
  const saveTokens = (data: AuthResponse) => {
    if (
      !data.accessToken ||
      !data.refreshToken ||
      !data.accessTokenExpiration ||
      !data.refreshTokenExpiration
    ) {
      console.log('토큰 정보가 불완전함');
      return false;
    }

    setCookie('accessToken', data.accessToken, {
      expires: new Date(data.accessTokenExpiration),
      path: '/',
    });

    setCookie('refreshToken', data.refreshToken, {
      expires: new Date(data.refreshTokenExpiration),
      path: '/',
    });

    console.log('토큰 정상 발급됨');
    return true;
  };

  return useMutation({
    mutationFn: async () => {
      try {
        // 인증 시도
        const authResponse = await instance.get<AuthResponse>(
          '/api/github/auth/authentication'
        );
        return { type: 'auth', data: authResponse.data } as const;
      } catch (error) {
        // 인증 실패 시 미인증 엔드포인트 호출
        const notAuthResponse = await instance.get<{ type: string }>(
          '/api/github/auth/not/authentication'
        );
        return {
          type: 'not_auth',
          message: notAuthResponse.data.type,
        } as const;
      }
    },
    onSuccess: (result) => {
      if (result.type === 'auth') {
        saveTokens(result.data);
      } else {
        console.log('인증되지 않은 사용자:', result.message);
        removeCookie('accessToken', { path: '/' });
        removeCookie('refreshToken', { path: '/' });
      }
    },
    onError: (error) => {
      console.error('인증 오류:', error);
      removeCookie('accessToken', { path: '/' });
      removeCookie('refreshToken', { path: '/' });
    },
  });
};
