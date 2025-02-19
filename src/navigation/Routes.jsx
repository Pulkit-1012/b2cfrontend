import React, { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy loading the components
const SignInContainer = React.lazy(() => import('../screens/loginScreen/containers/SigninContainer'));
const HomeScreenContainer = React.lazy(() => import('../screens/homeScreen/containers/homeScreenContainer'));
const SignUpContainer = React.lazy(() => import('../screens/signupScreen/containers/SignUpContainer'));
const IndividualDashboardWrapper = React.lazy(() => import('../screens/individualDashboard/utils/IndividualDashboardWrapper'));
const DashboardWrapper = React.lazy(() => import('../screens/userDashboard/utils/DashboardWrapper'));

// Fallback Component using Material UI's CircularProgress
const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

// Public Routes
export const publicRoutes = [
  { path: '/signup', element: <Suspense fallback={<Loading />}><SignUpContainer /></Suspense> },
  { path: '/signin', element: <Suspense fallback={<Loading />}><SignInContainer /></Suspense> },
  { path: "/", element: <Suspense fallback={<Loading />}><HomeScreenContainer /></Suspense> }
];

// Private Routes
export const privateRoutes = [
  { path: '/userDashboard', element: <Suspense fallback={<Loading />}><DashboardWrapper /></Suspense> },
  { path: '/individualDashboard', element: <Suspense fallback={<Loading />}><IndividualDashboardWrapper /></Suspense> }
];