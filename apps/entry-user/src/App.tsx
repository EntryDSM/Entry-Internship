import { GlobalStyle } from '@entry/design-token';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </>
  );
};
