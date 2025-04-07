import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
