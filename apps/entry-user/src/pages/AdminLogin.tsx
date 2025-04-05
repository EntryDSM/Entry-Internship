import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { TokenResponse } from '@entry/types';
import { github } from '../assets';
import { useMutation } from '@tanstack/react-query';
import { githubAuthApi, COOKIE_OPTIONS } from '../apis';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setCookie] = useCookies([
    'accessToken',
    'refreshToken',
    'accessTokenExpiration',
    'refreshTokenExpiration',
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const GITHUB_REDIRECT_URL = import.meta.env.VITE_GITHUB_REDIRECT_URL;

  const saveTokensToCookies = useCallback(
    (tokens: TokenResponse) => {
      const {
        accessToken,
        refreshToken,
        accessTokenExpiration,
        refreshTokenExpiration,
      } = tokens;

      setCookie('accessToken', accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: accessTokenExpiration
          ? githubAuthApi.calculateExpiration(accessTokenExpiration)
          : COOKIE_OPTIONS.maxAge,
      });

      setCookie('refreshToken', refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: refreshTokenExpiration
          ? githubAuthApi.calculateExpiration(refreshTokenExpiration)
          : COOKIE_OPTIONS.maxAge,
      });

      if (accessTokenExpiration) {
        setCookie(
          'accessTokenExpiration',
          accessTokenExpiration,
          COOKIE_OPTIONS
        );
      }

      if (refreshTokenExpiration) {
        setCookie(
          'refreshTokenExpiration',
          refreshTokenExpiration,
          COOKIE_OPTIONS
        );
      }
    },
    [setCookie]
  );

  const authMutation = useMutation({
    mutationFn: githubAuthApi.processGithubAuth,
    onSuccess: (data) => {
      saveTokensToCookies(data);
      setLoading(false);
      navigate('/admin', { replace: true });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          setError(
            error.response.data === 'Not authenticated'
              ? '인증되지 않은 사용자입니다. 조직에 가입된 사용자만 접근 가능합니다.'
              : `인증 실패: ${error.response.data || error.message}`
          );
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
    },
  });

  const handleGithubLogin = useCallback(() => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user:email,read:org`;
    window.location.href = githubAuthUrl;
  }, [GITHUB_CLIENT_ID, GITHUB_REDIRECT_URL]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const accessTokenExpiration = urlParams.get('accessTokenExpiration');
    const refreshTokenExpiration = urlParams.get('refreshTokenExpiration');
    const code = urlParams.get('code');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      setError('GitHub 인증 중 오류가 발생했습니다: ' + errorParam);
      return;
    }

    if (accessToken && refreshToken) {
      saveTokensToCookies({
        accessToken,
        refreshToken,
        accessTokenExpiration: accessTokenExpiration || undefined,
        refreshTokenExpiration: refreshTokenExpiration || undefined,
      });
      navigate('/admin', { replace: true });
      return;
    }

    if (code) {
      setLoading(true);
      authMutation.mutate(code);
    }
  }, [location, navigate, authMutation, saveTokensToCookies]);

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
