import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import { TokenResponse } from '@entry/types';
import { github } from '../assets';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const GITHUB_REDIRECT_URL = import.meta.env.VITE_GITHUB_REDIRECT_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        if (error.response?.data === 'Not authenticated') {
          setError(
            '인증되지 않은 사용자입니다. 조직에 가입된 사용자만 접근 가능합니다.'
          );
        } else {
          setError(`인증 실패: ${error.response?.data || error.message}`);
        }
      } else {
        setError(
          `서버 오류: ${error.response?.status} ${
            error.response?.data || error.message
          }`
        );
      }
    } else if (error instanceof Error) {
      setError(`오류 발생: ${error.message}`);
    } else {
      setError('알 수 없는 오류가 발생했습니다');
    }
    setLoading(false);
  }, []);

  const saveTokens = useCallback((tokens: TokenResponse) => {
    const {
      accessToken,
      refreshToken,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = tokens;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    if (accessTokenExpiration) {
      localStorage.setItem('accessTokenExpiration', accessTokenExpiration);
    }

    if (refreshTokenExpiration) {
      localStorage.setItem('refreshTokenExpiration', refreshTokenExpiration);
    }
  }, []);

  const handleGithubLogin = useCallback(() => {
    console.log('GitHub 로그인 시작');
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user:email,read:org`;
    window.location.href = githubAuthUrl;
  }, [GITHUB_CLIENT_ID, GITHUB_REDIRECT_URL]);

  const handleOAuthProcess = useCallback(
    async (code: string) => {
      setLoading(true);
      setError('');
      console.log('GitHub 인증 코드 확인, 인증 프로세스 시작');

      try {
        console.log('1단계: GitHub 코드로 GitHub 액세스 토큰 요청');
        const authResponse = await axios.get(`${BASE_URL}/api/github/auth`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (!authResponse.data || !authResponse.data.githubAccessToken) {
          throw new Error('GitHub 액세스 토큰을 받지 못했습니다');
        }

        const { githubAccessToken } = authResponse.data;
        console.log('GitHub 액세스 토큰 받음, 2단계 진행');

        try {
          console.log('2단계: 내부 시스템 토큰 요청');
          const authenticationResponse = await axios.get<TokenResponse>(
            `${BASE_URL}/api/github/auth/authentication`,
            {
              headers: {
                Authorization: `Bearer ${githubAccessToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );

          saveTokens(authenticationResponse.data);
          console.log('인증 완료, 관리자 페이지로 이동');
          navigate('/admin', { replace: true });
        } catch (authError) {
          handleError(authError);
        }
      } catch (error) {
        console.error('GitHub 토큰 획득 오류:', error);
        handleError(error);
      }
    },
    [BASE_URL, handleError, navigate, saveTokens]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const accessTokenExpiration = urlParams.get('accessTokenExpiration');
    const refreshTokenExpiration = urlParams.get('refreshTokenExpiration');
    const code = urlParams.get('code');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      console.error('GitHub 인증 오류:', errorParam);
      setError('GitHub 인증 중 오류가 발생했습니다: ' + errorParam);
      return;
    }

    if (accessToken && refreshToken) {
      console.log('URL에서 토큰 정보 감지');
      saveTokens({
        accessToken,
        refreshToken,
        accessTokenExpiration: accessTokenExpiration || undefined,
        refreshTokenExpiration: refreshTokenExpiration || undefined,
      });
      console.log('토큰 정보 저장 완료, 관리자 페이지로 이동');
      navigate('/admin', { replace: true });
      return;
    }

    if (code) {
      console.log('GitHub 인증 코드 확인, 인증 프로세스 시작');
      handleOAuthProcess(code);
    }
  }, [location, navigate, saveTokens, handleOAuthProcess]);

  useEffect(() => {
    if (!loading) return;

    const timeoutId = setTimeout(() => {
      setError(
        '서버 응답 시간이 초과되었습니다. 페이지를 새로고침하거나 나중에 다시 시도해주세요.'
      );
      setLoading(false);
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  return (
    <LoginContainer>
      <LoginCard>
        <Title>로그인</Title>
        <GithubButton onClick={handleGithubLogin} disabled={loading}>
          <GithubIcon src={github} alt="GitHub 로고" />
          {loading ? '인증 처리 중...' : 'GitHub로 로그인하기'}
        </GithubButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && (
          <LoadingMessage>
            GitHub 인증 처리 중입니다. 잠시만 기다려주세요...
          </LoadingMessage>
        )}
        <NavDivider>
          <NavLinks>
            <NavLink onClick={() => navigate('/')}>홈</NavLink>
            <Separator>|</Separator>
            <NavLink onClick={() => navigate('/login-user')}>
              유저 로그인
            </NavLink>
          </NavLinks>
        </NavDivider>
      </LoginCard>
    </LoginContainer>
  );
};

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  padding: 8px;
  background-color: #fdecea;
  border-radius: 4px;
`;

const LoadingMessage = styled.div`
  color: #3498db;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  padding: 8px;
  background-color: #ebf5fb;
  border-radius: 4px;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  user-select: none;
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 29px;
  margin-bottom: 30px;
  font-weight: bold;
`;

const GithubButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  background-color: #1b1f23;
  color: white;
  font-size: 19px;
  transition: background-color 0.2s;
  font-weight: bold;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? '#1b1f23' : '#2c3e50')};
  }
`;

const GithubIcon = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
`;

const NavDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #777;
  font-size: 17px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 15px;
`;

const NavLink = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 8px;
`;
