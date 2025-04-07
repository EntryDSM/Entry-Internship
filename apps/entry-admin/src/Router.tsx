import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout';
import { getAdminRoutes } from './routes';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [],
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: getAdminRoutes(),
  },
]);
