import React, { Component } from 'react';
import { withRouter } from '../../../utils/withRouter';
import SignUpComponent from '../components/SignUpComponent';
import { signUpApi } from './api';
import {toast} from 'react-hot-toast';

class SignUpContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: false,
      usernameErrorMessage: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: '',
    };
  }

  validateInputs = () => {
    let usernameError = false;
    let usernameErrorMessage = '';
    let emailError = false;
    let emailErrorMessage = '';
    let passwordError = false;
    let passwordErrorMessage = '';
  
    if (!this.state.username || this.state.username.length < 3) {
      usernameError = true;
      usernameErrorMessage = 'Username must be at least 3 characters.';
    }

    if (!this.state.email || !/\S+@\S+\.\S+/.test(this.state.email)) {
      emailError = true;
      emailErrorMessage = 'Invalid email address.';
    }
  
    if (!this.state.password || this.state.password.length < 6) {
      passwordError = true;
      passwordErrorMessage = 'Password must be at least 6 characters.';
    }
  
    this.setState({ usernameError, usernameErrorMessage, emailError, emailErrorMessage, passwordError, passwordErrorMessage });
  
    return !(usernameError || emailError || passwordError);
  };
  

  handleSubmit = async (event) => {
    event.preventDefault();

    if (!this.validateInputs()) return;

    try {
      const response = await signUpApi(this.state.username, this.state.email, this.state.password);
      if (response) {
        toast.success('Signup successful! Please login.');
        this.props.navigate('/signin');
      }
    } catch (error) {
      toast.error(error.message || 'Signup failed.');
    }
  };
  

  render() {
    return (
      <SignUpComponent
        username={this.state.username}
        onUsernameChange={(e) => this.setState({ username: e.target.value })}
        email={this.state.email}
        onEmailChange={(e) => this.setState({ email: e.target.value })}
        password={this.state.password}
        onPasswordChange={(e) => this.setState({ password: e.target.value })}
        handleSubmit={this.handleSubmit}
        validateInputs={this.validateInputs}
        usernameError={this.state.usernameError}
        usernameErrorMessage={this.state.usernameErrorMessage}
        emailError={this.state.emailError}
        emailErrorMessage={this.state.emailErrorMessage}
        passwordError={this.state.passwordError}
        passwordErrorMessage={this.state.passwordErrorMessage}
      />
    );
  }
}

export default withRouter(SignUpContainer);