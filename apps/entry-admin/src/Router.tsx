import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/layout';
import {
  Main,
  CreateSupport,
  DetailPost,
  ApplicationStatus,
  JobStatus,
  ApplicantDashboard,
  EditSupport,
} from './pages';
import OAuthHandler from './components/OAuthHandler';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: 'admin', element: <Main /> },
      { path: 'admin/job-status/:noticeId', element: <DetailPost /> },
      { path: 'admin/job-status', element: <JobStatus /> },
      { path: 'admin/create-support', element: <CreateSupport /> },
      { path: 'admin/support', element: <ApplicationStatus /> },
      { path: 'admin/support/:noticeId', element: <ApplicantDashboard /> },
      { path: 'admin/edit-support/:noticeId', element: <EditSupport /> },
      { path: '*', element: <div>404!</div> },
    ],
  },
  {
    path: '/auth/token',
    element: <OAuthHandler />,
  },
]);

export default Router;
