import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
        {/* <RouterProvider router={Router} />s */}
        asdf
    </React.Fragment>
        
  );
}

export default App;
