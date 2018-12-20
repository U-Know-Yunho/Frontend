import React, { Component } from 'react';
import LoginFormView from '../components/LoginFormView';
import { withUser } from '../contexts/UserContext';

class LoginForm extends Component {
  render() {
    const { login, checkId, socialLogin } = this.props;
    return (
      <div>
        <LoginFormView
          onLogin={login}
          onSocialLogin={socialLogin}
          onCheckId={checkId}
        />
      </div>
    );
  }
}

export default withUser(LoginForm);
