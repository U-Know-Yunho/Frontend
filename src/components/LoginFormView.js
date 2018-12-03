import React, { Component } from 'react';
import s from '../scss/LoginForm.module.scss';
import cx from 'classnames';
import { Redirect } from 'react-router-dom';

export default class LoginFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      success: false,
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
    // 로그인이 성공적으로 끝났을 때
    this.setState({
      success: true,
    });
  }

  render() {
    const { username, password, success } = this.state;
    if (success) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className={cx(s.wrapper, s.loginWrapper)}>
          <div className={s.loginBox}>
            <h1>Login</h1>
            <input
              onChange={e => this.handleFieldChange(e, 'username')}
              type="text"
              value={username}
              required
            />
            <input
              onChange={e => this.handleFieldChange(e, 'password')}
              type="password"
              value={password}
              required
            />
            <button
              onClick={() => this.handleLoginButtonClick()}
              className={s.loginBtn}
            >
              Login
            </button>
            <span>회원가입</span>
            <button className={s.naver}>네이버로 시작하기</button>
            <button className={s.kakao}>카카오로 시작하기</button>
            <button className={s.facebook}>페이스북으로 시작하기</button>
          </div>
        </div>
      );
    }
  }
}
