// import React, { Component } from "react";
// import { getIndividualDetails, onboardIndividual, verifyGDC, checkStatus, deleteIndividual } from "../services/individualService";
// import IndividualDashboard from "../components/IndividualDashboard";

// class IndividualDashboardContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       individual: null,
//       requestId: localStorage.getItem("requestId") || null, // Load stored requestId
//       status: null,
//       statusDetails: null,
//       isDialogOpen: false,
//       loading: false,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     this.fetchIndividualDetails();
//     this.fetchVerificationStatus(); // Fetch previous verification history
//   }

//   fetchIndividualDetails = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId"); 
//     if (!individualId) return;

//     this.setState({ loading: true });

//     try {
//       const response = await getIndividualDetails(userId, individualId, token);
//       this.setState({ individual: response, loading: false });
//     } catch (error) {
//       this.setState({ error: "Failed to fetch individual details", loading: false });
//     }
//   };

//   fetchVerificationStatus = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");
//     const storedRequestId = localStorage.getItem("requestId");

//     if (!individualId || !storedRequestId) return; // No previous verification found

//     try {
//       const response = await checkStatus(userId, individualId, storedRequestId, token);
//       this.setState({ statusDetails: response, requestId: storedRequestId });
//     } catch (error) {
//       console.warn("Failed to fetch verification status:", error);
//     }
//   };

//   handleOnboard = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");
//     const ogid = localStorage.getItem("onGridInividualId");


//     if(!ogid) {
//       try {
//         const response = await onboardIndividual(userId, individualId, token);
//         localStorage.setItem("onGridInividualId", response.id);
//         alert("Individual onboarded successfully!");
//       } catch (error) {
//         alert("Failed to onboard individual.");
//       }
//     }
//     else return alert("Individual is already onboared!");

    
//   };

//   handleVerifyGDC = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");
//     const reqid = localStorage.getItem("requestId");

//     if(!reqid)
//     {
//       try {
//         const response = await verifyGDC(userId, individualId, token);
//         localStorage.setItem("requestId", response.requestId); // Store requestId persistently
//         this.setState({ requestId: response.requestId });
//         alert("GDC Verification started!");
//       } catch (error) {
//         alert("Failed to verify GDC.");
//       }
//     }
//     else return alert("The request has already been initiated!");
//   };

//   handleCheckStatus = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");
//     const { requestId } = this.state;

//     if (!requestId) {
//       alert("No previous verification found. Please verify GDC first.");
//       return;
//     }

//     try {
//       const response = await checkStatus(userId, individualId, requestId, token);
//       this.setState({ statusDetails: response, isDialogOpen: true });
//       alert(`Status: ${response.state}`);
//     } catch (error) {
//       alert("Failed to check status.");
//     }
//   };

//   handleDeleteIndividual = async () => {
//     const { userId } = this.props;
//     const token = sessionStorage.getItem("access_token");
//     const individualId = localStorage.getItem("selectedIndividualId");

//     try {
//       await deleteIndividual(userId, token, individualId);
//       localStorage.removeItem("requestId");
//       localStorage.removeItem("onGridInividualId");
//       this.setState({ requestId: null, statusDetails: null });
//       alert("Individual deleted successfully!");
//     } catch (error) {
//       alert("Failed to delete individual.");
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
//         statusDetails={this.state.statusDetails}
//         isDialogOpen={this.state.isDialogOpen}
//         onCloseDialog={this.handleCloseDialog}
//         onDeleteIndividual={this.handleDeleteIndividual}
//       />
//     );
//   }
// }

// export default IndividualDashboardContainer;






import React, { Component } from "react";
import { getIndividualDetails, onboardIndividual, verifyGDC, checkStatus, deleteIndividual, getVerificationList } from "../services/individualService";
import { addPan, verifyPan } from "../services/individualService";
import IndividualDashboard from "../components/IndividualDashboard";
import Alert from '@mui/material/Alert';

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
    this.fetchVerifications();
  }

  fetchIndividualDetails = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
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
      localStorage.setItem("onGridIndividualId", response.id);//added
      alert("Individual onboarded successfully!");
      // <Alert variant="outlined" severity="success">
      //   Individual onboarded successfully!
      // </Alert>
    } catch (error) {
      alert("Individual is already onboarded!");
    }
  };

  handleVerifyGDC = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    try {
      const response = await verifyGDC(userId, individualId, token);
      <Alert variant="outlined" severity="success">
        GDC verification started!
      </Alert>
    } catch (error) {
      alert("Already initiated!");
    }
    
  };

  handleCheckStatus = async (id) => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await checkStatus(userId, individualId, token, id);
      this.setState({statusDetails: response, isDialogOpen: true})
      // alert(`Status: ${response.state}`);
    } catch (error) {
      alert("Failed to check status.");
    }
  };

  handleDeleteIndividual = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      await deleteIndividual(userId, token, individualId);
      // alert("Individual deleted successfully!");
      <Alert variant="outlined" severity="success">
        Individual deleted successfully!
      </Alert>
    } catch (error) {
      alert("Failed to delete individual.");
    }
  };

  handleCloseDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  
  fetchVerifications = async () => {
    const {userId} = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const verificationArray = await getVerificationList(userId, individualId, token);
      this.setState({verificationArray});
      alert("Details fetched successfully");
      // <Alert variant="outlined" severity="success">
      //   Details fetched successfully!
      // </Alert>
    }
    catch(error) {
      alert("Failed to fetch the verifications!");
    }
  }


  handleAddPan = async (documentUID) => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    
    try {
      await addPan(userId, individualId, token, {
        nameAsPerDocument: this.state.individual.name,
        documentUID
      });
      alert("PAN added successfully!");
    } catch (error) {
      alert("Failed to add PAN.");
    }
  };

  handleVerifyPan = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    
    try {
      await verifyPan(userId, individualId, token);
      alert("PAN verification initiated!");
    } catch (error) {
      alert("Failed to initiate PAN verification.");
    }
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
        onDeleteIndividual={this.handleDeleteIndividual}
        // handleCheckVerifications = {this.handleCheckVerifications}
        verificationArray={this.state.verificationArray}
        onAddPan={this.handleAddPan}
        onVerifyPan={this.handleVerifyPan}
      />

    );
  }
}

export default IndividualDashboardContainer;