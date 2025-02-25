import React, { Component } from "react";
import { getIndividualDetails, onboardIndividual, verifyGDC, checkStatus, deleteIndividual, getVerificationList, checkPanStatus } from "../services/individualService";
import { addPan, verifyPan } from "../services/individualService";
import dateConverter from "../services/dateConverter";
import IndividualDashboard from "../components/IndividualDashboard";
import { toast } from "react-hot-toast"
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ShowAlerts from "../../../shared/alerts/ShowAlerts";

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
      // alert: null, //added
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
      this.setState({ alert: ShowAlerts(`Successfully fetched the ${individual.name}'s details.`, "success")});
    } catch (error) {
      // this.setState({ alert: ShowAlerts(
      //   "Failed to fetch individual details", "error"
      // ) });
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
      // this.setState({
      //   alert: ShowAlerts(
      //     "Indiviual onboarded succesfully!!", "success"
      //   )
      // })

    } catch (error) {
      toast.error("Individual is already onboarded!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Individual is already onboarded!",
      //     "error"
      //   )
      // })
    }
  };

  handleVerifyGDC = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");
    try {
      const response = await verifyGDC(userId, individualId, token);
      toast.success("GDC verification started!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Request for GDC Verification initiated!",
      //     "success"
      //   )
      // })
    } catch (error) {
      toast.error("Already initiated!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Already initiated, please wait for the result!",
      //     "info"
      //   )
      // })
    }

  };

  handleCheckStatus = async (id) => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await checkStatus(userId, individualId, token, id);
      this.setState({ statusDetails: response, isDialogOpen: true })
    } catch (error) {
      toast.error("Failed to check status.");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Failed to check status.", 
      //     "error"
      //   )
      // })
    }
  };

  handleDeleteIndividual = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      await deleteIndividual(userId, token, individualId);
      toast.success("Individual deleted successfully!")
      // this.setState({
      //   alert: ShowAlerts(
      //     "Individual deleted successfully!",
      //     "success"
      //   )
      // })
    } catch (error) {
      toast.error("Failed to delete individual.");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Failed to delete individual.",
      //     "error"
      //   )
      // })
    }
  };

  handleCloseDialog = () => {
    this.setState({ isDialogOpen: false });
  };


  fetchVerifications = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const verificationArray = await getVerificationList(userId, individualId, token);
      this.setState({ verificationArray });
      toast.success("Details fetched successfully");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Details fetched successfully.",
      //     "success"
      //   )
      // })
    }
    catch (error) {
      toast.error("Failed to fetch the verifications!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "Failed to fetch the verifications.",
      //     "error"
      //   )
      // })
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
      // this.setState({
      //   alert: ShowAlerts(
      //     "",
      //     ""
      //   )
      // })
    } catch (error) {
      toast.error("PAN is already added!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "",
      //     ""
      //   )
      // })
    }
  };

  handleVerifyPan = async () => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      await verifyPan(userId, individualId, token);
      toast.success("PAN verification initiated!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "",
      //     ""
      //   )
      // })
    } catch (error) {
      toast.error("Already initiated!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "",
      //     ""
      //   )
      // })
    }
  };


  handleCheckPANStatus = async (id) => {
    const { userId } = this.props;
    const token = sessionStorage.getItem("access_token");
    const individualId = localStorage.getItem("selectedIndividualId");

    try {
      const response = await checkPanStatus(userId, individualId, token, id);
      this.setState({ statusDetails: response, isDialogOpen: true });
    }
    catch (error) {
      toast.error("Failed to check status!");
      // this.setState({
      //   alert: ShowAlerts(
      //     "",
      //     ""
      //   )
      // })
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
        // alert={this.state.alert}
      />

    );
  }
}

export default IndividualDashboardContainer;