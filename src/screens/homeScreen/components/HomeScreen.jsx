import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

const HomeScreen = ({ onGetStarted }) => {
  return (
    <Container className='bg-[#f5f7fa] mx-auto h-screen overflow-hidden' maxWidth="md">
      <Box textAlign="center" sx={{ mt: 10, p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to the B2C Verification Portal
        </Typography>
        <Button href='/signup' variant="contained" onClick={onGetStarted} sx={{ mt: 2, bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default HomeScreen;