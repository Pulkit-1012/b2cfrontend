import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import bgImage from '../../../assets/91675.jpg'

const HomeScreen = ({ onGetStarted }) => {
  return (
    <Container className='bg-[#f5f7fa] mx-auto h-screen overflow-hidden' maxWidth="100%" >
      <Box textAlign="center" sx={{ mt: 10, p: 3 }}>
        <Typography className='pt-12 pb-24 text-[#231f20] font-extrabold' variant="h2" gutterBottom>
          Welcome to the <span className='text-[#369896]'>OnGrid B2C-Verification</span> Portal
        </Typography>
        <Button href='/signup' className=' text-2xl' variant="contained" onClick={onGetStarted} sx={{ bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }}>
          Get Started
        </Button>
        <Typography className="mt-4 pt-24 pb-20 text-center font-bold text-[#2c9595] !text-2xl">
          Build trust. Verify with confidence. 
          <span className="text-[#4a4e59]">PAN & GDC-approved.</span>
        </Typography>

        <Typography className="mt-16 text-center text-black font-thin text-xl">
          Digital Trust Platform Empowering HR managers and service providers through comprehensive Background Verifications (BGV) and checks for ensuring trust and accountability, and for achieving HR/ISO compliance!
        </Typography>

      </Box>
    </Container>
  );
};

export default HomeScreen;