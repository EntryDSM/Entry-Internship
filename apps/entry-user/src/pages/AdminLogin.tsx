import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { github } from '../assets';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const GITHUB_REDIRECT_URL = import.meta.env.VITE_GITHUB_REDIRECT_URL;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleGithubLogin = () => {
    console.log('GitHub 로그인 시작');
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user:email,read:org`;
    window.open(githubAuthUrl, '_self');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const accessTokenExpiration = urlParams.get('accessTokenExpiration');
    const refreshTokenExpiration = urlParams.get('refreshTokenExpiration');
    const code = urlParams.get('code');

    if (accessToken && refreshToken) {
      console.log('URL에서 토큰 정보 감지');

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      if (accessTokenExpiration) {
        localStorage.setItem('accessTokenExpiration', accessTokenExpiration);
      }

      if (refreshTokenExpiration) {
        localStorage.setItem('refreshTokenExpiration', refreshTokenExpiration);
      }

      console.log('토큰 정보 저장 완료, 관리자 페이지로 이동');
      navigate('/admin');
      return;
    }

    if (code || location.pathname.includes('/oauth2/code/github')) {
      setLoading(true);
      setError('');
      console.log('GitHub 인증 코드 확인, 인증 프로세스 시작');

      const handleOAuthProcess = async () => {
        try {
          console.log('GitHub 코드 교환 요청');
          const authResponse = await axios.get(`${BASE_URL}/api/github/auth`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });

          console.log('GitHub 인증 응답 성공');
          const { githubAccessToken } = authResponse.data;

          if (!githubAccessToken) {
            throw new Error('GitHub 액세스 토큰이 없습니다');
          }

          console.log('인증된 사용자 정보 및 토큰 요청');
          try {
            const authenticationResponse = await axios.get(
              `${BASE_URL}/api/github/auth/authentication`,
              {
                headers: {
                  Authorization: `Bearer ${githubAccessToken}`,
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            );

            console.log('내부 인증 응답 성공');
            const {
              accessToken,
              refreshToken,
              accessTokenExpiration,
              refreshTokenExpiration,
            } = authenticationResponse.data;

            // URL에 토큰 정보를 포함하여 리디렉션
            const redirectUrl = new URL(window.location.origin);
            redirectUrl.searchParams.append('accessToken', accessToken);
            redirectUrl.searchParams.append('refreshToken', refreshToken);

            if (accessTokenExpiration) {
              redirectUrl.searchParams.append(
                'accessTokenExpiration',
                accessTokenExpiration
              );
            }

            if (refreshTokenExpiration) {
              redirectUrl.searchParams.append(
                'refreshTokenExpiration',
                refreshTokenExpiration
              );
            }

            console.log(
              '토큰 정보와 함께 페이지 이동:',
              redirectUrl.toString()
            );
            window.open(redirectUrl.toString(), '_self');
          } catch (authError) {
            // axios 에러 처리
            if (axios.isAxiosError(authError)) {
              // 응답이 'Not authenticated' 인지 확인
              if (
                authError.response?.status === 401 ||
                authError.response?.status === 403
              ) {
                if (authError.response?.data === 'Not authenticated') {
                  console.log('인증되지 않은 사용자');
                  setError(
                    '인증되지 않은 사용자입니다. 조직에 가입된 사용자만 접근 가능합니다.'
                  );
                  setLoading(false);
                  return;
                }
              }
              throw new Error(
                `인증 실패: ${authError.response?.status} ${
                  authError.response?.data || authError.message
                }`
              );
            }
            throw authError;
          }
        } catch (error) {
          console.error('로그인 프로세스 중 오류 발생:', error);

          if (axios.isAxiosError(error)) {
            console.error('Axios 에러:', error.response?.data || error.message);

            if (error.response?.status === 403) {
              setError('조직에 가입된 사용자만 접근 가능합니다.');
            } else if (error.response?.status === 401) {
              setError('인증에 실패했습니다. 다시 로그인해주세요.');
            } else {
              setError(
                '인증 과정에서 오류가 발생했습니다: ' +
                  (error.response?.data || error.message)
              );
            }
          } else if (error instanceof Error) {
            console.error('에러 메시지:', error.message);
            setError('인증 과정에서 오류가 발생했습니다: ' + error.message);
          } else {
            setError('네트워크 오류가 발생했습니다.');
          }
          setLoading(false);
        }
      };

      handleOAuthProcess();
    }
  }, [location, navigate, BASE_URL]);

  return (
    <LoginContainer>
      <LoginCard>
        <Title>로그인</Title>
        <GithubButton onClick={handleGithubLogin} disabled={loading}>
          <GithubIcon src={github} alt="GitHub 로고" />
          {loading ? '로그인 중...' : 'GitHub로 로그인하기'}
        </GithubButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <NavDivider>
          <NavLinks>
            <NavLink onClick={() => navigate('/')}>홈</NavLink>
            <Separator>|</Separator>
            <NavLink onClick={() => navigate('/login-user')}>유저 로그인</NavLink>
          </NavLinks>
        </NavDivider>
      </LoginCard>
    </LoginContainer>
  );
};

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
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

const GithubButton = styled.button`
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
  cursor: pointer;
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
