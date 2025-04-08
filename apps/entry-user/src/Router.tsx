import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components';
import {
  Post,
  DetailPost,
  ApplicationWriting,
  Main,
  Login,
  AdminLogin,
} from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // children: [
    //   {
    //     path: '/',
    //     element: <Main />,
    //   },
    //   {
    //     path: '/post',
    //     element: <Post />,
    //   },
    //   {
    //     path: '/post/:id',
    //     element: <DetailPost />,
    //   },
    //   {
    //     path: '/post/:id/application-writing',
    //     element: <ApplicationWriting />,
    //   },
    // ],
  },
  {
    path: '/login-user',
    element: <Login />,
  },
  {
    path: '/login-admin',
    element: <AdminLogin />,
  },
]);
