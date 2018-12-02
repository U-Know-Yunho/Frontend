import React, { Component } from 'react';
import RegisterFormView from '../components/RegisterFormView';
import { withUser } from '../contexts/UserContext';

class RegisterForm extends Component {
  render() {
    return (
      <div>
        <RegisterFormView />
      </div>
    );
  }
}

export default withUser(RegisterForm);
