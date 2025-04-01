import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components';
import { Main, DetailPost, ApplicationWriting } from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/post',
        element: <Main />,
      },
      {
        path: '/team',
        element: <div>dd</div>,
      },
      {
        path: '/post/:id',
        element: <DetailPost />,
      },
      {
        path: '/post/:id/application-writing',
        element: <ApplicationWriting />,
      },
    ],
  },
]);
