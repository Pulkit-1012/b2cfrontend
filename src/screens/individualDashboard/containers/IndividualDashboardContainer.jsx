import React, { Component } from "react";
import { getIndividualDetails, onboardIndividual, verifyGDC, checkStatus, deleteIndividual, getVerificationList, checkPanStatus } from "../services/individualService";
import { addPan, verifyPan } from "../services/individualService";
import dateConverter from "../services/dateConverter";
import IndividualDashboard from "../components/IndividualDashboard";
import {toast} from "react-hot-toast"

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
      toast.success("Individual onboarded successfully!");
    } catch (error) {
      toast.error("Individual is already onboarded!");
    }
  };

  handleVerifyGDC = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    try {
      const response = await verifyGDC(userId, individualId, token);
      toast.success("GDC verification started!");
    } catch (error) {
      toast.error("Already initiated!");
    }
    
  };

  handleCheckStatus = async (id) => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await checkStatus(userId, individualId, token, id);
      this.setState({statusDetails: response, isDialogOpen: true})
    } catch (error) {
      toast.error("Failed to check status.");
    }
  };

  handleDeleteIndividual = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      await deleteIndividual(userId, token, individualId);
      toast.success("Individual deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete individual.");
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
      toast.success("Details fetched successfully");
    }
    catch(error) {
      toast.error("Failed to fetch the verifications!");
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
      toast.success("PAN added successfully!");
    } catch (error) {
      toast.error("PAN is already added!");
    }
  };

  handleVerifyPan = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    
    try {
      await verifyPan(userId, individualId, token);
      toast.success("PAN verification initiated!");
    } catch (error) {
      toast.error("Already initiated!");
    }
  };


  handleCheckPANStatus = async (id) => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await checkPanStatus(userId, individualId, token, id);
      this.setState({statusDetails: response, isDialogOpen: true});
    }
    catch(error){
      toast.error("Failed to check status!");
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
        onCheckPanStatus={this.handleCheckPANStatus}
        dateConverter={dateConverter}
      />

    );
  }
}

export default IndividualDashboardContainer;