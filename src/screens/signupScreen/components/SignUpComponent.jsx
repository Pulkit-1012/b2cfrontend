import React from 'react';
import { Box, Button, FormControl, FormLabel, TextField, Typography, Stack, Card, Divider, Link } from '@mui/material';
import bgImage from '../../../assets/91675.jpg'


const SignUpComponent = ({ username, onUsernameChange, email, onEmailChange, password, onPasswordChange, handleSubmit, validateInputs, usernameError, usernameErrorMessage, emailError, emailErrorMessage, passwordError, passwordErrorMessage }) => {
  return (
    <Stack spacing={3} alignItems="center" maxWidth='100%' justifyContent="center" className='bg-[#f5f7fa]' sx={{ height: '100vh' }}>
      <Card variant="outlined" sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>Sign Up</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <TextField 
              error={usernameError}
              helperText={usernameErrorMessage}
              value={username}
              onChange={onUsernameChange}
              onBlur={validateInputs}
              placeholder="Enter your username"
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField 
              error={emailError}
              helperText={emailErrorMessage}
              value={email}
              onChange={onEmailChange}
              onBlur={validateInputs}
              placeholder="your@email.com"
              fullWidth
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField 
              error={passwordError}
              helperText={passwordErrorMessage}
              value={password}
              onChange={onPasswordChange}
              onBlur={validateInputs}
              type="password"
              placeholder="••••••"
              fullWidth
            />
          </FormControl>

          <Button type='submit' fullWidth variant="contained" sx={{bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' }}}>Sign Up</Button> 

        </Box>

        <Divider>or</Divider>

        <Typography textAlign="center" mt={2}>
          Already have an account? <Link href="/signin" sx={{ color: '#34cccc' }}>Sign in</Link>
        </Typography>
      </Card>
    </Stack>
  );
};

export default SignUpComponent;
