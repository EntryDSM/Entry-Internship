import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken && refreshToken) {
      // 기본 만료시간 설정 (액세스 1일, 리프레시 30일)
      const accessExpDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const refreshExpDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      // 쿠키에 저장
      document.cookie = `accessToken=${accessToken}; path=/; expires=${accessExpDate.toUTCString()}`;
      document.cookie = `refreshToken=${refreshToken}; path=/; expires=${refreshExpDate.toUTCString()}`;

      navigate('/', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <div>처리 중...</div>;
};

export default OAuthHandler;
