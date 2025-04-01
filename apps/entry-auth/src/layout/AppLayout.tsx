import styled from '@emotion/styled';
import { Outlet } from 'react-router';
import { GlobalStyle } from '@entry/design-token';

export const AppLayout = () => {
  return (
    <>
      <MainContainer>
        <Outlet />
      </MainContainer>
      <GlobalStyle />;
    </>
  );
};

const MainContainer = styled.main`
  width: 100vw;
`;
