import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AdminMain = () => {
  const [cookies] = useCookies(['accessToken', 'refreshToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      console.log(
        '토큰이 존재합니다:',
        cookies.accessToken.substring(0, 15) + '...'
      );
    } else {
      console.log('토큰이 없습니다.');
    }
  }, [cookies]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>관리자 페이지</h1>
      <p>
        {cookies.accessToken
          ? '로그인되었습니다. 토큰이 쿠키에 저장되어 있습니다.'
          : '로그인이 필요합니다. 토큰이 쿠키에 저장되어 있지 않습니다.'}
      </p>
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      >
        <h2>쿠키 정보:</h2>
        <pre>{JSON.stringify(cookies, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdminMain;
