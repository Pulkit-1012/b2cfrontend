import React from "react";
import { useAuth } from "../../../auth";
import IndividualDashboardContainer from "../containers/IndividualDashboardContainer";

const IndividualDashboardWrapper = () => {
  const { userId } = useAuth(); // Use the hook in a functional component

  return <IndividualDashboardContainer userId={userId} />;
};

export default IndividualDashboardWrapper;
