import { createBrowserRouter } from 'react-router-dom';
import { AdminLogin, Login } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/admin-login',
        element: <AdminLogin />,
      },
    ],
  },
]);
