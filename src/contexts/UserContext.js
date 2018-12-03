import React, { Component } from 'react';
import api from '../api';
const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: this.login.bind(this),
    };
  }

  async login(username, password) {
    const res = await api.post(
      '/api/members/login',
      {
        username,
        password,
      },
      {
        headers: { 'Content-type': 'application/json' },
        credentials: 'same-origin',
      }
    );
    localStorage.setItem('token', res.data.token);
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withUser(WrappedComponent) {
  return function WithUser(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { UserProvider, Consumer as UserConsumer, withUser };
