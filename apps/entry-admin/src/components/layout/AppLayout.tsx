import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { GlobalStyle } from '@entry/design-token';
import { AdminHeader } from '@entry/ui';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AppLayout = () => {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const accessTokenExpiration = params.get('accessTokenExpiration');
    const refreshTokenExpiration = params.get('refreshTokenExpiration');

    if (accessToken && refreshToken) {
      setCookie('accessToken', accessToken, {
        expires: accessTokenExpiration ? new Date(accessTokenExpiration) : undefined,
        path: '/',
      });

      setCookie('refreshToken', refreshToken, {
        expires: refreshTokenExpiration ? new Date(refreshTokenExpiration) : undefined,
        path: '/',
      });
    }
  }, [location, setCookie]);

  return (
    <>
      <AdminHeader />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <GlobalStyle />
    </>
  );
};

const MainContainer = styled.main`
  width: 100vw;
  margin-top: 64px;
`;
