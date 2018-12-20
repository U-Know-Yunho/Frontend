import React, { Component } from 'react';
import RegisterFormView from '../components/RegisterFormView';
import { withUser } from '../contexts/UserContext';

class RegisterForm extends Component {
  render() {
    const { register, checkId } = this.props;
    return (
      <div>
        <RegisterFormView onRegister={register} onCheckId={checkId} />
      </div>
    );
  }
}

export default withUser(RegisterForm);
