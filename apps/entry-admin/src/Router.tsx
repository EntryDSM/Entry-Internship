import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { adminRoutes } from './routes';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: adminRoutes,
  },
]);
