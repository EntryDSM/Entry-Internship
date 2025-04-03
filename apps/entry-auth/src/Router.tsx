import { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLogin, Login } from './pages';
import { AppLayout } from '@org/entry-admin/layout';
import { adminRoutes } from '@org/entry-admin/routes';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return localStorage.getItem('accessToken') ? (
    children
  ) : (
    <Navigate to="/admin-login" />
  );
};

export const Router = createBrowserRouter([
  {
    // 인증 라우트
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
      {
        path: '/',
        element: <Navigate to="/login" replace />,
      },
    ],
  },

  // 관리자 라우트
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: adminRoutes,
  },
]);
