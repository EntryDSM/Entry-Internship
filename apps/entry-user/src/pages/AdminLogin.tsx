import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { github } from '../assets';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const GITHUB_REDIRECT_URL = import.meta.env.VITE_GITHUB_REDIRECT_URL;

  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      GITHUB_REDIRECT_URL
    )}&scope=user:email,read:org`;
    window.location.href = githubAuthUrl;
  };

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');

      if (code) {
        setLoading(true);
        try {
          console.log('Github 인증 코드 받음!', code);
          const authResponse = await axios.post('/api/github/auth', {
            code: code,
          });
          const { githubAccessToken } = authResponse.data;

          // 조직 확인, 토큰 받기
          try {
            const authenticationResponse = await axios.get(
              '/api/github/auth/authentication',
              {
                headers: {
                  Authorization: `Bearer ${githubAccessToken}`,
                },
              }
            );

            const { accessToken, refreshToken } = authenticationResponse.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/admin'); // 관리자 페이지로 리다이엑트
          } catch (error) {
            if (
              axios.isAxiosError(error) &&
              error.response &&
              error.response.status === 403
            ) {
              setError('조직에 가입된 사용자만 접근 가능합니다.');
              navigate('/api/github/auth/not/authentication');
            } else {
              setError('인증 과정에서 오류가 발생했습니다.');
            }
          }
        } catch {
          setError('GitHub 로그인 과정에서 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };
    handleOAuthRedirect();
  }, [location, navigate]);

  return (
    <LoginContainer>
      <LoginCard>
        <Title>로그인</Title>
        <GithubButton onClick={handleGithubLogin}>
          <GithubIcon src={github} alt="github" />
          {loading ? '로그인 중...' : 'GitHub로 로그인하기'}
        </GithubButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
  padding: 5px 16px;
  border: none;
  border-radius: 10px;
  background-color: #1b1f23;
  color: white;
  cursor: pointer;
  font-size: 19px;
  transition: background-color 0.2s;
  font-weight: bold;
`;

const GithubIcon = styled.img`
  width: 50px;
  height: 50px;
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
