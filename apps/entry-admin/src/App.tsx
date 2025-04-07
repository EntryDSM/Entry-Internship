import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import { GlobalStyle } from '@entry/design-token';
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
