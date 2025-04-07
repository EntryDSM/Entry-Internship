import { RouteObject } from 'react-router-dom';
import {
  Main,
  CreateSupport,
  DetailPost,
  ApplicationStatus,
  JobStatus,
  ApplicantDashboard,
  EditSupport,
} from './pages';

export const adminRoutes: RouteObject[] = [
  { path: '', element: <Main /> },
  { path: 'job-status/:noticeId', element: <DetailPost /> },
  { path: 'job-status', element: <JobStatus /> },
  { path: 'create-support', element: <CreateSupport /> },
  { path: 'support', element: <ApplicationStatus /> },
  { path: 'support/:noticeId', element: <ApplicantDashboard /> },
  { path: 'edit-support/:noticeId', element: <EditSupport /> },
];

export const getAdminRoutes = () => adminRoutes;
