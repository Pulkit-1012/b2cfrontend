import React from "react";
import { Container, Typography, Card, CardContent, Button, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const IndividualDashboard = ({ individual, loading, error, onOnboard, onVerifyGDC, onCheckStatus, status,  isDialogOpen, onCloseDialog, statusDetails, onDeleteIndividual, verificationArray }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  console.log("Thois is my array" , verificationArray);

  return (
    <Container maxWidth="md" sx={{ mt: 4, height: '100vh' }}>
      <Typography variant="h4" fontWeight="bold">{ individual ? `Individual - ${individual.name}'s Dashboard` : 'Individual-Dashboard '}</Typography>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} mt={3}>
        {/* Left Section: Individual Details */}
        <Box flex={1} mr={2}>
          <Typography variant="h6" fontWeight="bold">Individual Details</Typography>
          {individual && (
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography><strong>Name:</strong> {individual.name}</Typography>
                <Typography><strong>City:</strong> {individual.city}</Typography>
                <Typography><strong>Gender:</strong> {individual.gender}</Typography>
                <Typography><strong>Phone:</strong> {individual.phone}</Typography>
                <Typography><strong>Profession ID:</strong> {individual.professionId}</Typography>
                <Typography><strong>DOB:</strong> {individual.dob}</Typography>
                <Typography><strong>Father's Name:</strong> {individual.fathersName}</Typography>
                <Typography><strong>Mother's Name:</strong> {individual.mothersName}</Typography>
                <Typography><strong>Consent:</strong> {individual.hasConsent ? "Yes" : "No"}</Typography>
                <Typography><strong>Consent Text:</strong> {individual.consentText}</Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* verification list cards */}
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold">List Of Verifications Initiated:</Typography>
          {individual && verificationArray && verificationArray.length > 0 ? (
            verificationArray.map((detail, index) => (
              <Card key={index} sx={{ boxShadow: 3, p: 2, mt: 2 }}>
                <CardContent>
                  <Typography><strong>Verification Type: </strong> {detail.offeringType}</Typography>
                  <Typography><strong>Status: </strong> {detail.state}</Typography>
                  {/* <Typography><strong>Request ID: </strong> {detail.requestId}</Typography> */}
                  {/* {detail.date && <Typography><strong>Date:</strong> {new Date(detail.date).toLocaleDateString()}</Typography>} */}
                  <Button variant="contained" color="success" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }} onClick={() => onCheckStatus(detail.id)}>
                    Check Status
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
          <Typography variant="body1" mt={1}>No additional details available.</Typography>
        )}
      </Box>


        {/* Right Section: Actions */}
        <Box flex={1} ml={2}>
          <Typography variant="h6" fontWeight="bold">Actions</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }} onClick={onOnboard}>
            Onboard Individual
          </Button>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }} onClick={onVerifyGDC}>
            Verify GDC
          </Button>
          {/* <Button variant="contained" color="success" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }} onClick={onCheckStatus}>
            Check GDC Status
          </Button> */}
          <Button variant="contained" color="error" fullWidth sx={{ mt: 2, bgcolor: '#e57373', color: 'white', '&:hover': { bgcolor: '#2c9595' } }} onClick={onDeleteIndividual}>
            Delete Individual
          </Button>
          {status && (
            <Typography variant="body1" mt={2} fontWeight="bold">
              Current Status: {status}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Dialog for Status Details */}
      <Dialog open={isDialogOpen} onClose={onCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Verification Status</DialogTitle>
        <DialogContent>
          {statusDetails && (
            <>
              <Typography><strong>Request ID:</strong> {statusDetails.requestId}</Typography>
              {statusDetails.state && (<Typography><strong>State:</strong> {statusDetails.state}</Typography>)}
              {statusDetails.closedReason && (<Typography><strong>Closed Reason:</strong> {statusDetails.closedReason}</Typography>)}
              {statusDetails.closedReason && (<Typography><strong>Closed Remarks:</strong> {statusDetails.closedRemarks}</Typography>)}
              {statusDetails.created && (<Typography><strong>Created:</strong> {new Date(parseInt(statusDetails.created)).toLocaleString()}</Typography>)}
              
              {statusDetails.dataSufficiencyDate && (<Typography><strong>Data Sufficiency Date:</strong> {statusDetails.dataSufficiencyDate}</Typography>)}
              {statusDetails.completedDate && (<Typography><strong>Completed Date:</strong> {statusDetails.completedDate}</Typography>)}
              {statusDetails.closed && (<Typography><strong>Closed:</strong> {statusDetails.closed}</Typography>)}

              {statusDetails.gdcReport && (
                <Typography>
                  <strong>GDC Report:</strong> <a href={statusDetails.gdcReport} target="_blank" rel="noopener noreferrer">Download Report</a>
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IndividualDashboard;