import React, { useState } from "react";
import { Container, Typography, Card, CardContent, Button, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const IndividualDashboard = ({ individual, loading, error, onOnboard, onVerifyGDC, onCheckStatus, status, isDialogOpen, onCloseDialog, statusDetails, onDeleteIndividual, verificationArray, onAddPan, onVerifyPan, onCheckPanStatus, dateConverter }) => {
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  console.log("Thois is my array", verificationArray);

  const [isPanDialogOpen, setIsPanDialogOpen] = useState(false);
  const [documentUID, setDocumentUID] = useState("");

  const handleAddPanClick = () => {
    setIsPanDialogOpen(true);
  };

  const handlePanDialogClose = () => {
    setIsPanDialogOpen(false);
    setDocumentUID("");
  };

  const handlePanSubmit = () => {
    onAddPan(documentUID);
    handlePanDialogClose();
  };

  return (

    

    <Container maxWidth="lg" className="mx-auto mt-4 h-screen">
      {/* {alert} */}
      <Box className=" flex items-center justify-between mt-10 py-6 px-4 md:px-8 bg-[#f5f7fa] shadow-md rounded-lg ">
        <Typography variant="h4"
          fontWeight="bold"
          className="text-[#2c9595] pt-3 drop-shadow-sm">{individual ? `Individual - ${individual.name}'s Dashboard` : 'Individual-Dashboard '}
        </Typography>
      </Box>


      <Box className='flex flex-auto mx-auto gap-x-6'>
        {/* Left Section: Individual Details */}
        <Box mt={3} sx={{ flex: 1, p: 3, borderRadius: 2, boxShadow: 2 }} className="bg-[#f5f7fa]">
          <Typography variant="h6" fontWeight="bold" className="text-[#2c9595]">Individual Details</Typography>
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
                {/* <Typography><strong>Consent:</strong> {individual.hasConsent ? "Yes" : "No"}</Typography>
                <Typography><strong>Consent Text:</strong> {individual.consentText}</Typography> */}
              </CardContent>
            </Card>
          )}
        </Box>

        {/* verification list cards */}
        <Box mt={3} sx={{ flex: 1, p: 3, borderRadius: 2, boxShadow: 2 }} className="bg-[#f5f7fa]">
          <Typography variant="h6" fontWeight="bold" className="text-[#2c9595]">List Of Verifications Initiated:</Typography>
          {individual && verificationArray && verificationArray.length > 0 ? (
            verificationArray.map((detail, index) => (
              <Card key={index} sx={{ boxShadow: 3, p: 2, mt: 2 }}>
                <CardContent>
                  <Typography><strong>Verification Type: </strong> {detail.offeringType}</Typography>
                  <Typography><strong>Status: </strong> {detail.state}</Typography>
                  {/* <Typography><strong>Request ID: </strong> {detail.requestId}</Typography> */}
                  {/* {detail.date && <Typography><strong>Date:</strong> {new Date(detail.date).toLocaleDateString()}</Typography>} */}
                  <Button variant="contained" color="success" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', transition: '0.3s', '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' } }} onClick={detail.offeringType === "GDC" ? () => onCheckStatus(detail.id) : () => onCheckPanStatus(detail.id)}>
                    {detail.state === "Completed" ? "View Report" : "Check Status"}
                  </Button>

                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" mt={1}>No additional details available.</Typography>
          )}
        </Box>


        {/* Right Section: Actions */}
        <Box mt={3} sx={{ flex: 1, p: 3, borderRadius: 2, boxShadow: 2 }} className="bg-[#f5f7fa]">
          <Typography variant="h6" fontWeight="bold" className="text-[#2c9595]">Actions</Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', transition: '0.3s', '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' } }} onClick={onOnboard}>
            Onboard Individual
          </Button>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', transition: '0.3s', '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' } }} onClick={onVerifyGDC}>
            Verify GDC
          </Button>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', transition: '0.3s', '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' } }} onClick={handleAddPanClick}>
            Add PAN
          </Button>

          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', transition: '0.3s', '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' } }} onClick={onVerifyPan}>
            Verify PAN
          </Button>

          {/* <Button variant="contained" color="error" fullWidth sx={{ mt: 2, bgcolor: '#e57373', color: 'white', transition: '0.3s', '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' } }} onClick={onDeleteIndividual}>
            Delete Individual
          </Button> */}
          {status && (
            <Typography variant="body1" mt={2} fontWeight="bold">
              Current Status: {status}
            </Typography>
          )}
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={onCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle className="text-[#2c9595] font-bold">Verification Status</DialogTitle>
        <DialogContent>
          {statusDetails && (
            <>
              {/* {console.log("this is my report url", statusDetails.panReport.pdfServingUrl)}; */}
              <Typography><strong>Request ID:</strong> {statusDetails.requestId}</Typography>
              {statusDetails.state && (<Typography><strong>State:</strong> {statusDetails.state}</Typography>)}
              {statusDetails.closedReason && (<Typography><strong>Closed Reason:</strong> {statusDetails.closedReason}</Typography>)}
              {statusDetails.closedReason && (<Typography><strong>Closed Remarks:</strong> {statusDetails.closedRemarks}</Typography>)}
              {statusDetails.created && (<Typography><strong>Created:</strong> {dateConverter(statusDetails.created)}</Typography>)}

              {statusDetails?.gdcReport?.reason && (<Typography><strong>Reason:</strong> {statusDetails.gdcReport.reason}</Typography>)}
              {statusDetails?.gdcReport?.result && (<Typography><strong>Result:</strong> {statusDetails.gdcReport.result}</Typography>)}

              {statusDetails?.panReport?.reason && (<Typography><strong>Reason:</strong> {statusDetails.panReport.reason}</Typography>)}
              {statusDetails?.panReport?.result && (<Typography><strong>Result:</strong> {statusDetails.panReport.result}</Typography>)}

              {statusDetails.dataSufficiencyDate && (<Typography><strong>Data Sufficiency Date:</strong> {dateConverter(statusDetails.dataSufficiencyDate)}</Typography>)}
              {statusDetails.completedDate && (<Typography><strong>Completed Date:</strong> {dateConverter(statusDetails.completedDate)}</Typography>)}
              {statusDetails.closed && (<Typography><strong>Closed:</strong> {statusDetails.closed}</Typography>)}
              {(statusDetails?.panReport || statusDetails?.gdcReport) && (
                <Typography>
                  <strong>Report: </strong>
                  <a
                    className="bg-[#48e84a] hover:bg-[#318846] p-1 text-white rounded-sm"
                    href={statusDetails.gdcReport?.pdfServingUrl || statusDetails.panReport?.pdfServingUrl}
                  >
                    View Report
                  </a>
                </Typography>
              )}

            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isPanDialogOpen} onClose={handlePanDialogClose}>
        <DialogTitle className="text-[#2c9595] font-bold">Add PAN</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name as per Document"
            fullWidth
            value={individual ? individual.name : ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Document UID"
            fullWidth
            value={documentUID}
            onChange={(e) => setDocumentUID(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePanDialogClose} color="primary">Cancel</Button>
          <Button onClick={handlePanSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

    </Container>
    // <Container maxWidth="md" className="mt-4 max-h-full">
    //   <Box className="flex items-center justify-between py-6 px-4 md:px-8 bg-[#f5f7fa] shadow-md rounded-lg">
    //     <Typography
    //       variant="h4"
    //       fontWeight="bold"
    //       className="text-[#2c9595] drop-shadow-sm"
    //     >
    //       {individual ? `${individual.name}'s Dashboard` : 'Individual Dashboard'}
    //     </Typography>
    //   </Box>

    //   <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} className="p-4">
    //     {/* Individual Details Section */}
    //     <Box sx={{ flex: 1, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
    //       <Typography variant="h6" fontWeight="bold" gutterBottom className="text-[#2c9595]">
    //         Individual Details
    //       </Typography>
    //       {individual && (
    //         <Card sx={{ boxShadow: 4, borderRadius: 2, overflow: 'hidden' }}>
    //           <CardContent className="space-y-2">
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Name:</strong> {individual.name}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>City:</strong> {individual.city}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Gender:</strong> {individual.gender}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Phone:</strong> {individual.phone}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Profession:</strong> {individual.professionId}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Date of Birth:</strong> {individual.dob}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Father's Name:</strong> {individual.fathersName}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Mother's Name:</strong> {individual.mothersName}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Consent:</strong> {individual.hasConsent ? "Yes" : "No"}
    //             </Typography>
    //             <Typography variant="body1" className="text-gray-700">
    //               <strong>Consent Text:</strong> {individual.consentText}
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       )}
    //     </Box>

    //     {/* Verification List Section */}
    //     <Box sx={{ flex: 1, p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
    //       <Typography variant="h6" fontWeight="bold" gutterBottom className="text-[#2c9595]">
    //         List of Verifications Initiated
    //       </Typography>
    //       {individual && verificationArray && verificationArray.length > 0 ? (
    //         verificationArray.map((detail, index) => (
    //           <Card
    //             key={index}
    //             sx={{
    //               boxShadow: 3,
    //               borderRadius: 2,
    //               transition: '0.3s',
    //               '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
    //               cursor: 'pointer',
    //               mt: 2
    //             }}
    //           >
    //             <CardContent>
    //               <Typography className="text-gray-800">
    //                 <strong>Verification Type:</strong> {detail.offeringType}
    //               </Typography>
    //               <Typography className="text-gray-800">
    //                 <strong>Status:</strong> {detail.state}
    //               </Typography>
    //               <Button
    //                 variant="contained"
    //                 sx={{
    //                   mt: 2,
    //                   bgcolor: '#34cccc',
    //                   color: 'white',
    //                   borderRadius: 2,
    //                   p: 1.5,
    //                   fontSize: '1rem',
    //                   transition: '0.3s',
    //                   '&:hover': { bgcolor: '#2c9595', transform: 'scale(1.05)' },
    //                 }}
    //                 onClick={
    //                   detail.offeringType === "GDC" ? () => onCheckStatus(detail.id) : () => onCheckPanStatus(detail.id)
    //                 }
    //               >
    //                 Check Status
    //               </Button>
    //             </CardContent>
    //           </Card>
    //         ))
    //       ) : (
    //         <Typography variant="body1" className="text-gray-700 mt-2">
    //           No additional details available.
    //         </Typography>
    //       )}
    //     </Box>
    //   </Stack>
    // </Container>

  );
};

export default IndividualDashboard;