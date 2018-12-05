import React, { Component } from 'react';
import api from '../api';
const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
      register: this.register.bind(this),
      checkId: this.checkId.bind(this),
    };
  }
  async componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({
        isLogin: true,
      });
    }
  }

  async register({ ...value }) {
    const {
      username,
      password,
      lastName,
      firstName,
      email,
      phoneNumber,
    } = value;

    const res = await api.post('/api/members/signup/', {
      username,
      password,
      lastName,
      firstName,
      email,
      phoneNumber,
    });
    console.log(res.data);
  }

  async checkId(username) {
    const res = await api.post('/api/members/checkID/', {
      username,
    });
    return res.data.message;
  }

  async login(username, password) {
    const res = await api.post('/api/members/login/', {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    this.setState({
      isLogin: true,
    });
  }

  logout() {
    const token = localStorage.getItem('token');
    console.log(token);

    api.get('/api/members/logout/', {
      headers: {
        Authorization: 'Token ' + token,
      },
    });

    localStorage.removeItem('token');
    this.setState({
      isLogin: false,
    });
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
