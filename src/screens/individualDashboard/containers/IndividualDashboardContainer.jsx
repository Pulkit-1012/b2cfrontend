import React, { Component } from "react";
import { getIndividualDetails, onboardIndividual, verifyGDC, checkStatus } from "../services/individualService";
import IndividualDashboard from "../components/IndividualDashboard";

class IndividualDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individual: null,
      requestId: null,
      status: null,
      statusDetails: null,
      isDialogOpen: false,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchIndividualDetails();
  }

  fetchIndividualDetails = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId"); // Get individualId from localStorage
    if (!individualId) return;

    this.setState({ loading: true });

    try {
      const response = await getIndividualDetails(userId, individualId, token);
      this.setState({ individual: response, loading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch individual details", loading: false });
    }
  };

  handleOnboard = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await onboardIndividual(userId, individualId, token);
      alert("Individual onboarded successfully!");
    } catch (error) {
      alert("Failed to onboard individual.");
    }
  };

  handleVerifyGDC = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await verifyGDC(userId, individualId, token);
      this.setState({ requestId: response.requestId });
      alert("GDC Verification started!");
    } catch (error) {
      alert("Failed to verify GDC.");
    }
  };

  handleCheckStatus = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    const { requestId } = this.state;

    if (!requestId) {
      alert("Please verify GDC first.");
      return;
    }

    try {
      const response = await checkStatus(userId, individualId, requestId, token);
      // this.setState({ status: response.state });
      this.setState({statusDetails: response, isDialogOpen: true})
      alert(`Status: ${response.state}`);
    } catch (error) {
      alert("Failed to check status.");
    }
  };

  handleCloseDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    return (
      <IndividualDashboard
        individual={this.state.individual}
        loading={this.state.loading}
        error={this.state.error}
        onOnboard={this.handleOnboard}
        onVerifyGDC={this.handleVerifyGDC}
        onCheckStatus={this.handleCheckStatus}
        status={this.state.status}
        isDialogOpen={this.state.isDialogOpen}
        onCloseDialog={this.handleCloseDialog}
        statusDetails={this.state.statusDetails}
      />

    );
  }
}

export default IndividualDashboardContainer;













// import React, { Component } from "react";
// import { getIndividualDetails, onboardIndividual, verifyGDC, checkStatus } from "../services/individualService";
// import IndividualDashboard from "../components/IndividualDashboard";

// class IndividualDashboardContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       individual: null,
//       requestId: null,
//       status: null,
//       loading: false,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     this.fetchIndividualDetails();
//   }

//   fetchIndividualDetails = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId"); // Get individualId from localStorage
//     if (!individualId) return;

//     this.setState({ loading: true });

//     try {
//       const response = await getIndividualDetails(userId, individualId, token);
//       this.setState({ individual: response, loading: false });
//     } catch (error) {
//       this.setState({ error: "Failed to fetch individual details", loading: false });
//     }
//   };

//   handleOnboard = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");

//     try {
//       const response = await onboardIndividual(userId, individualId, token);
//       alert("Individual onboarded successfully!");
//     } catch (error) {
//       alert("Failed to onboard individual.");
//     }
//   };

//   handleVerifyGDC = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");

//     try {
//       const response = await verifyGDC(userId, individualId, token);
//       this.setState({ requestId: response.requestId });
//       alert("GDC Verification started!");
//     } catch (error) {
//       alert("Failed to verify GDC.");
//     }
//   };

//   handleCheckStatus = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");
//     const { requestId } = this.state;

//     if (!requestId) {
//       alert("Please verify GDC first.");
//       return;
//     }

//     try {
//       const response = await checkStatus(userId, individualId, requestId, token);
//       this.setState({ status: response.state });
//       alert(`Status: ${response.state}`);
//     } catch (error) {
//       alert("Failed to check status.");
//     }
//   };

//   handleCloseDialog = () => {
//     this.setState({ isDialogOpen: false });
//   };

//   render() {
//     return (
//       <IndividualDashboard
//         individual={this.state.individual}
//         loading={this.state.loading}
//         error={this.state.error}
//         onOnboard={this.handleOnboard}
//         onVerifyGDC={this.handleVerifyGDC}
//         onCheckStatus={this.handleCheckStatus}
//         status={this.state.status}
//       />

//     );
//   }
// }

// export default IndividualDashboardContainer;