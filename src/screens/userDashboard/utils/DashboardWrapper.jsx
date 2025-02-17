import React from 'react';
import { useAuth } from '../../../auth';
import UserDashboardContainer from '../containers/UserDashboardContainer';

const DashboardWrapper = () => {
  const { token, userId } = useAuth();

  return <UserDashboardContainer token={token} userId={userId} />;
};

export default DashboardWrapper;
