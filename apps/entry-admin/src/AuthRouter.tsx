import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface AuthRouterProps {
  children: React.ReactNode;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const accessTokenExpiration = searchParams.get('accessTokenExpiration');
    const refreshTokenExpiration = searchParams.get('refreshTokenExpiration');

    if (accessToken && refreshToken) {
      setCookie('accessToken', accessToken, {
        expires: accessTokenExpiration
          ? new Date(accessTokenExpiration)
          : undefined,
        path: '/',
      });

      setCookie('refreshToken', refreshToken, {
        expires: refreshTokenExpiration
          ? new Date(refreshTokenExpiration)
          : undefined,
        path: '/',
      });

      const currentPath = window.location.pathname;
      navigate(currentPath, { replace: true });
    }

    setIsProcessing(false);
  }, [searchParams, setCookie, navigate]);

  if (isProcessing) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <h2>로그인 중...</h2>
        <p>잠시만 기다려주세요</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthRouter;
