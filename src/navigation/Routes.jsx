import React from 'react';
import SignInContainer from '../screens/loginScreen/containers/SigninContainer';
import HomeScreenContainer from '../screens/homeScreen/containers/homeScreenContainer';
import SignUpContainer from '../screens/signupScreen/containers/SignUpContainer';
import IndividualDashboardWrapper from '../screens/individualDashboard/utils/IndividualDashboardWrapper';
import DashboardWrapper from '../screens/userDashboard/utils/DashboardWrapper';

// Public Routes
export const publicRoutes = [
  { path: '/signup', element: <SignUpContainer/> },
  { path: '/signin', element: <SignInContainer /> },
  { path: "/", element: <HomeScreenContainer /> }
];

// Private Routes
export const privateRoutes = [
  { path: '/userDashboard', element: <DashboardWrapper/> },
  { path: '/individualDashboard', element: <IndividualDashboardWrapper /> }
];

























// import React from 'react';
// import HomeScreen from '../screens/homeScreen/components/HomeScreen';
// import UserDashboard from '../screens/userDashboard/components/UserDashboard';
// import IndividualDashboard from '../screens/individualDashboard/components/IndividualDashboard';


// import { PublicRoute } from '../layouts/public';
// import { PrivateRoute } from '../layouts/private';
// import SignInComponent from '../screens/loginScreen/components/SigninComponent';



// // Public Routes
// export const publicRoutes = [
//   { path: '/signup', element: <PublicRoute>Sign Up Component</PublicRoute> },
//   { path: '/signin', element: <PublicRoute><SignInComponent /></PublicRoute> },
//   { path: "/", element: <PublicRoute><HomeScreen/></PublicRoute>}
// ]

// // Private Routes
// export const privateRoutes = [
//   { path: '/userDashboard', element: <PrivateRoute><UserDashboard/></PrivateRoute>},
//   { path: '/individualDashboard', element: <PrivateRoute><IndividualDashboard/></PrivateRoute>}
// ]