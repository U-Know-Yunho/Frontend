import React, { Component } from 'react';

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
    return (
      <div>
        <input
          onChange={e => this.handleFieldChange(e, 'username')}
          type="text"
        />
        <input
          onChange={e => this.handleFieldChange(e, 'password')}
          type="password"
        />
        <button onClick={() => this.handleLoginButtonClick()}>Login</button>
      </div>
    );
  }
}
