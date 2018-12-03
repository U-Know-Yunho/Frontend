import React, { Component } from 'react';
import s from '../scss/LoginForm.module.scss';
import cx from 'classnames';

export default class LoginFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleFieldChange(e, name) {
    this.setState({
      [name]: e.target.value,
    });
  }

  async handleLoginButtonClick() {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    await onLogin(username, password);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className={cx(s.wrapper, s.loginWrapper)}>
        <div className={s.loginBox}>
          <h1>Login</h1>
          <input
            onChange={e => this.handleFieldChange(e, 'username')}
            type="text"
            value={username}
          />
          <input
            onChange={e => this.handleFieldChange(e, 'password')}
            type="password"
            value={password}
          />
          <button onClick={() => this.handleLoginButtonClick()}>Login</button>
        </div>
      </div>
    );
  }
}
