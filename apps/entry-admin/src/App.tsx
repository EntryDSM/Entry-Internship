import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
