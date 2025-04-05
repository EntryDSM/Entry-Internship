import axios from 'axios';
import { TokenResponse } from '@entry/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export interface GithubAuthResponse {
  githubAccessToken: string;
}

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

      if (!response.data?.githubAccessToken) {
        throw new Error('GitHub 액세스 토큰을 받지 못했습니다');
      }

      return response.data.githubAccessToken;
    } catch (error) {
      console.error('GitHub 액세스 토큰 요청 실패:', error);
      throw error;
    }
  },

  authenticateWithGithub: async (
    githubAccessToken: string
  ): Promise<TokenResponse> => {
    try {
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

      return response.data;
    } catch (error) {
      console.error('GitHub 인증 토큰 발급 실패:', error);
      throw error;
    }
  },

  processGithubAuth: async (code: string): Promise<TokenResponse> => {
    const githubAccessToken = await githubAuthApi.getGithubAccessToken();

    return await githubAuthApi.authenticateWithGithub(githubAccessToken);
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
