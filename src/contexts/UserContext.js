import React, { Component } from 'react';
import api from '../api';
const { Provider, Consumer } = React.createContext();

export default class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      infoLoading: false,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
      register: this.register.bind(this),
      checkId: this.checkId.bind(this),
      deleteAcc: this.deleteAcc.bind(this),
      refreshInfo: this.refreshInfo.bind(this),
      username: '',
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
    };
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      const {
        data: { username: name, lastName, firstName, email, phoneNumber },
      } = await api.get('/api/members/profile/');

      this.setState({
        isLogin: true,
        username: name,
        lastName,
        firstName,
        email,
        phoneNumber,
        infoLoading: true,
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

    await api.post('/api/members/signup/', {
      username,
      password,
      lastName,
      firstName,
      email,
      phoneNumber,
    });
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
    const {
      data: { username: name, lastName, firstName, email, phoneNumber },
    } = await api.get('/api/members/profile/');
    this.setState({
      isLogin: true,
      username: name,
      lastName,
      firstName,
      email,
      phoneNumber,
    });
  }

  logout() {
    const token = localStorage.getItem('token');
    api.get('/api/members/logout/', {
      headers: {
        Authorization: 'Token ' + token,
      },
    });

    localStorage.removeItem('token');
    this.setState({
      isLogin: false,
      username: '',
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
    });
  }

  deleteAcc() {
    localStorage.removeItem('token');
    this.setState({
      isLogin: false,
      username: '',
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
    });
  }

  async refreshInfo() {
    const {
      data: { email, phoneNumber },
    } = await api.get('/api/members/profile/');

    this.setState({
      email,
      phoneNumber,
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
