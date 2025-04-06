import axios from 'axios';
import { TokenResponse } from '@entry/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log('BASE_URL:', BASE_URL); // 디버깅용 로그

export interface GithubAuthResponse {
  githubAccessToken: string;
}

export const COOKIE_OPTIONS = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60, // 7일 (초 단위)
};

export const githubAuthApi = {
  // GitHub 로그인 처리
  handleGithubLogin: async () => {
    try {
      console.log(
        'Attempting GitHub login with URL:',
        `${BASE_URL}/api/github/auth/authentication`
      );

      const response = await axios.get(
        `${BASE_URL}/api/github/auth/authentication`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('GitHub login response:', response.data);

      // 반환된 URL로 리다이렉트
      window.location.href = response.data;
    } catch (error) {
      console.error('GitHub 로그인 요청 실패:', error);

      // 에러 세부 정보 로깅
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }

      throw error;
    }
  },

  // GitHub 토큰으로 인증하기
  authenticateWithGithubToken: async (
    githubAccessToken: string
  ): Promise<TokenResponse> => {
    try {
      console.log('Authenticating with GitHub token');

      const response = await axios.get(
        `${BASE_URL}/api/github/auth/authentication`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          params: {
            githubAccessToken: githubAccessToken,
          },
          withCredentials: true,
        }
      );

      console.log('Authentication response:', response.data);

      return response.data;
    } catch (error) {
      console.error('GitHub 토큰 인증 실패:', error);

      // 에러 세부 정보 로깅
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }

      // 인증되지 않은 사용자 처리
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          const notAuthResponse = await axios.get(
            `${BASE_URL}/api/github/auth/not/authentication`,
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              withCredentials: true,
            }
          );

          console.log('Not authenticated response:', notAuthResponse.data);

          throw new Error(notAuthResponse.data);
        } catch (notAuthError) {
          console.error('Not authenticated error:', notAuthError);
          throw notAuthError;
        }
      }

      throw error;
    }
  },

  calculateExpiration: (expirationDateStr?: string): number | undefined => {
    if (!expirationDateStr) return undefined;

    const expirationDate = new Date(expirationDateStr);
    const now = new Date();

    const secondsUntilExpiration = Math.floor(
      (expirationDate.getTime() - now.getTime()) / 1000
    );

    return secondsUntilExpiration > 0 ? secondsUntilExpiration : undefined;
  },
};
