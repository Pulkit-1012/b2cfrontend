import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import SignInComponent from '../components/SigninComponent';
import { signInApi } from './api';
import {toast} from 'react-hot-toast';


class SignInContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
      isLoggedIn: false,
    };
  }

  validateInputs = () => {
    let emailError = false;
    let emailErrorMessage = '';
    let passwordError = false;
    let passwordErrorMessage = '';

    if (!this.state.email || !/\S+@\S+\.\S+/.test(this.state.email)) {
      emailError = true;
      emailErrorMessage = 'Invalid email address.';
    }

    if (!this.state.password || this.state.password.length < 6) {
      passwordError = true;
      passwordErrorMessage = 'Password must be at least 6 characters.';
    }

    this.setState({ emailError, emailErrorMessage, passwordError, passwordErrorMessage });

    return !(emailError || passwordError);
  };


  handleSubmit = async (event) => {
    event.preventDefault();

    if (!this.validateInputs()) return;

    try {
      const response = await signInApi(this.state.email, this.state.password);
      if (response && response.access_token) {
        sessionStorage.setItem('access_token', response.access_token);
        toast.success('Login successful!');
        this.setState({ isLoggedIn: true });
        window.location.replace('/userDashboard'); //forced
      }
    } catch (error) {
      toast.error(error.message || 'Login failed.');
    }
  };



  render() {

    if (this.state.isLoggedIn==true) {
      return <Navigate to='/userDashboard' />
    }

    return (
      <SignInComponent
        email={this.state.email}
        onEmailChange={(e) => this.setState({ email: e.target.value })}
        password={this.state.password}
        onPasswordChange={(e) => this.setState({ password: e.target.value })}
        handleSubmit={this.handleSubmit}
        validateInputs={this.validateInputs}
        emailError={this.state.emailError}
        emailErrorMessage={this.state.emailErrorMessage}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordErrorMessage}
      />

    );
  }
}

export default SignInContainer;