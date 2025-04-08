import { useEffect } from 'react';

const OAuthHandler = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const accessTokenExp = urlParams.get('accessTokenExpiration');
    const refreshTokenExp = urlParams.get('refreshTokenExpiration');

    if (accessToken && refreshToken) {
      const accessExpDate = accessTokenExp
        ? new Date(accessTokenExp)
        : new Date(Date.now() + 24 * 60 * 60 * 1000);
      const refreshExpDate = refreshTokenExp
        ? new Date(refreshTokenExp)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      document.cookie = `accessToken=${accessToken}; path=/; expires=${accessExpDate.toUTCString()}`;
      document.cookie = `refreshToken=${refreshToken}; path=/; expires=${refreshExpDate.toUTCString()}`;

      const currentUrl = new URL('/oauth');
      currentUrl.searchParams.delete('accessToken');
      currentUrl.searchParams.delete('refreshToken');
      currentUrl.searchParams.delete('accessTokenExpiration');
      currentUrl.searchParams.delete('refreshTokenExpiration');

      window.history.replaceState({}, document.title, currentUrl.toString());
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>로그인 완료</h1>
      <p>토큰이 성공적으로 저장되었습니다.</p>
      <p>잠시 후 메인 페이지로 이동합니다...</p>
    </div>
  );
};

export default OAuthHandler;
