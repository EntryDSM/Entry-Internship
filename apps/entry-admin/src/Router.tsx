import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { getAdminRoutes } from './routes';
import { AdminLogin } from '@org/entry-user';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [],
  },
  {
    path: '/login-admin',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: getAdminRoutes(),
  },
]);
