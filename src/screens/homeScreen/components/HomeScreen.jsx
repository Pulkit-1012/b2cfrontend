import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import bgImage from '../../../assets/91675.jpg'

const HomeScreen = ({ onGetStarted }) => {
  return (
    <Container className='bg-[#f5f7fa] mx-auto h-screen overflow-hidden' maxWidth="100%" style={{ backgroundImage: `url(${bgImage})` }}>
      <Box textAlign="center" sx={{ mt: 10, p: 3 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to the B2C Verification Portal
        </Typography>
        <Button href='/signup' className=' text-2xl' variant="contained" onClick={onGetStarted} sx={{ bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }}>
          Get Started
        </Button>
        <Typography className="mt-4 pt-48 text-center font-bold text-[#2c9595] !text-2xl">
          Build trust. Verify with confidence. 
          <span className="text-[#34cccc]"> GDC-approved.</span>
        </Typography>

      </Box>
    </Container>
  );
};

export default HomeScreen;