import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box, Stack, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDashboard = ({ user, individuals, onAddIndividual }) => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    gender: '',
    phone: '',
    professionId: '',
    dob: '',
    hasConsent: true,
    consentText: '',
    fathersName: '',
    mothersName: '',
  });



  const handleIndividualClick = (individualId) => {
    localStorage.setItem("selectedIndividualId", individualId);
    navigate('/individualDashboard');
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddIndividual(formData);
      handleClose();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, height: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography className='text-[#2c9595]' variant="h4" fontWeight="bold">
          User Dashboard
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            User Details
          </Typography>
          {user && (
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.userName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Individuals
          </Typography>
          <Stack spacing={2}>
            {individuals.map((individual) => (
              <Card key={individual.individualId} sx={{ boxShadow: 2, cursor: 'pointer' }} onClick={()=> handleIndividualClick(individual.individualId)} >
                <CardContent>
                  <Typography>{individual.name}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Button variant="contained" sx={{ mt: 2, bgcolor: '#34cccc', color: 'white' }} onClick={handleOpen}> 
            Add Individual
          </Button>
        </Box>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Individual</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} fullWidth />
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} error={!!errors.city} helperText={errors.city} fullWidth />
            <TextField select label="Gender" name="gender" value={formData.gender} onChange={handleChange} error={!!errors.gender} helperText={errors.gender} fullWidth>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="F">F</MenuItem>
            </TextField>
            <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} fullWidth />
            <TextField label="Profession ID" name="professionId" value={formData.professionId} onChange={handleChange} error={!!errors.professionId} helperText={errors.professionId} fullWidth />
            <TextField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} error={!!errors.dob} helperText={errors.dob} fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Consent Text" name="consentText" value={formData.consentText} onChange={handleChange} error={!!errors.consentText} helperText={errors.consentText} fullWidth />
            <TextField label="Father's Name" name="fathersName" value={formData.fathersName} onChange={handleChange} error={!!errors.fathersName} helperText={errors.fathersName} fullWidth />
            <TextField label="Mother's Name" name="mothersName" value={formData.mothersName} onChange={handleChange} error={!!errors.mothersName} helperText={errors.mothersName} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#34cccc' }} >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserDashboard;