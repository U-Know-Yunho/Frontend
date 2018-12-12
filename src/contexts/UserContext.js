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
      socialLogin: this.socialLogin.bind(this),
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

  async socialLogin(
    id,
    first_name = '',
    last_name = '',
    email = '',
    phone_number = ''
    // response
  ) {
    console.log(id);
    console.log(first_name);
    console.log(last_name);
    console.log(email);
    console.log(phone_number);
    // console.log('test');
    // console.log(response);
    // try {
    //   const res = await api.post('/api/members/social-login/', {
    //     user_id: userID,
    //     last_name,
    //     first_name,
    //     email,
    //     phone_number,
    //   });
    //   console.log(res.data.token);
    //   localStorage.setItem('token', res.data.token);
    //   this.setState({
    //     isLogin: true,
    //   });
    // } catch {
    //   alert('소셜 로그인 실패');
    // }
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
