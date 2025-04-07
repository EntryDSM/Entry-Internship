import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={Router} />;
    </>
  );
}

export default App;
