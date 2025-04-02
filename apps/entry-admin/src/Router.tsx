import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import {
  Main,
  CreateSupport,
  DetailPost,
  ApplicationStatus,
  JobStatus,
  ApplicantDashboard,
  EditSupport,
} from './pages';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/job-status/:noticeId',
        element: <DetailPost />,
      },
      {
        path: '/job-status',
        element: <JobStatus />,
      },
      {
        path: '/create-support',
        element: <CreateSupport />,
      },
      {
        path: '/support-status',
        element: <ApplicationStatus />,
      },
      {
        path: '/support/:noticeId',
        element: <ApplicantDashboard />,
      },
      {
        path: '/edit-support/:noticeId',
        element: <EditSupport />,
      },
    ],
  },
]);
