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
<<<<<<< HEAD
import OAuthHandler from './components/OAuthHandler';
=======
>>>>>>> origin/fix/깃허브api

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
<<<<<<< HEAD
  },
  {
    path: '/auth/token',
    element: <OAuthHandler />,
=======
>>>>>>> origin/fix/깃허브api
  },
]);

export default Router;
