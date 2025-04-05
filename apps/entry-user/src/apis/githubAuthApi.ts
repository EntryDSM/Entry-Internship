import axios from 'axios';
import { TokenResponse } from '@entry/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  getGithubAccessToken: async (): Promise<string> => {
    try {
      const response = await axios.get<GithubAuthResponse>(
        `${BASE_URL}/api/github/auth`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log('GitHub 액세스 토큰 응답:', response.data);

      if (!response.data?.githubAccessToken) {
        throw new Error('GitHub 액세스 토큰을 받지 못했습니다');
      }

      return response.data.githubAccessToken;
    } catch (error) {
      console.error('GitHub 액세스 토큰 요청 실패:', error);
      throw error;
    }
  },

  authenticateWithGithubToken: async (
    githubAccessToken: string
  ): Promise<TokenResponse> => {
    try {
      console.log('GitHub 액세스 토큰으로 인증 요청');

      const response = await axios.get<TokenResponse>(
        `${BASE_URL}/api/github/auth/authentication`,
        {
          headers: {
            Authorization: `Bearer ${githubAccessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('인증 응답 데이터:', response.data);

      if (!response.data.accessToken || !response.data.refreshToken) {
        throw new Error(
          '액세스 토큰 또는 리프레시 토큰이 응답에 존재하지 않습니다'
        );
      }

      return response.data;
    } catch (error) {
      console.error('GitHub 토큰 인증 실패:', error);
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
