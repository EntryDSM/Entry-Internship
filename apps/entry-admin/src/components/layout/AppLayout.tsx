import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { GlobalStyle } from '@entry/design-token';
import { AdminHeader } from '@entry/ui';

export const AppLayout = () => {
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
