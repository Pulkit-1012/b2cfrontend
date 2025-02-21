import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormLabel, FormControl, Link, TextField, Typography, Stack, Card, Divider } from '@mui/material';
import bgImage from '../../../assets/91675.jpg'

const SignInComponent = ({ email, onEmailChange, password, onPasswordChange, handleSubmit, emailError, validateInputs, emailErrorMessage, passwordError, passwordErrorMessage }) => {
  return (
    <Stack spacing={3} alignItems="center" justifyContent="center" maxWidth='100%' sx={{ height: '100vh', overflow: 'hidden', backgroundImage: `url(${bgImage})` }}>
      <Card variant="outlined" sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>Sign In</Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          <Button type='submit' fullWidth variant="contained" sx={{ bgcolor: '#34cccc', color: 'white', '&:hover': { bgcolor: '#2c9595' } }} >Sign in</Button>

        </Box>

        <Divider>or</Divider>

        <Typography textAlign="center" mt={2}>
          Do not have an account? <Link href="/signup" sx={{ color: '#34cccc' }}>Sign up</Link>
        </Typography>
      </Card>
    </Stack>
  );
};

export default SignInComponent;