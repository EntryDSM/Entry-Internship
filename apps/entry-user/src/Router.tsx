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

import React from 'react';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <React.Fragment>asdf</React.Fragment>,
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
    }
]);
