import React from "react";
import { useAuth } from "../../../auth";
import IndividualDashboardContainer from "../containers/IndividualDashboardContainer";

const IndividualDashboardWrapper = () => {
  const { userId } = useAuth();

  return <IndividualDashboardContainer userId={userId} />;
};

export default IndividualDashboardWrapper;
