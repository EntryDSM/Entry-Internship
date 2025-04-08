// 토큰 처리를 위한 유틸리티 함수
export const processTokensFromUrl = () => {
  // URL에서 토큰 파라미터 확인
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('accessToken');
  const refreshToken = params.get('refreshToken');
  const accessTokenExpiration = params.get('accessTokenExpiration');
  const refreshTokenExpiration = params.get('refreshTokenExpiration');

  if (accessToken && refreshToken) {
    // 쿠키에 토큰 저장
    document.cookie = `accessToken=${accessToken}; path=/; ${accessTokenExpiration ? `expires=${new Date(accessTokenExpiration).toUTCString()}` : ''}`;
    document.cookie = `refreshToken=${refreshToken}; path=/; ${refreshTokenExpiration ? `expires=${new Date(refreshTokenExpiration).toUTCString()}` : ''}`;
    
    console.log('토큰이 쿠키에 저장되었습니다');
    return true;
  }
  return false;
};
