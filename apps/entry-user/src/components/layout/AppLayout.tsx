import styled from '@emotion/styled';
import { CommonHeader } from '@entry/ui';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <>
      <CommonHeader />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  margin-top: 64px;
`;
