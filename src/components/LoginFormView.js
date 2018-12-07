import React, { Component } from 'react';
import s from '../scss/LoginForm.module.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
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
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleFieldChange(e, name) {
    this.setState({
      [name]: e.target.value,
    });
  }

  async handleLoginButtonClick() {
    const { onLogin, onCheckId } = this.props;
    const { username, password } = this.state;
    const msg = await onCheckId(username);
    if (msg === '이미 존재하는 아이디입니다.') {
      try {
        await onLogin(username, password);
        // 로그인이 성공적으로 끝났을 때
        this.setState({
          success: true,
        });
      } catch {
        alert('비밀번호가 틀렸습니다.');
        this.setState({
          password: '',
        });
      }
    } else {
      alert('가입된 사용자가 아닙니다.');
      this.setState({
        username: '',
        password: '',
      });
    }
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
              로그인
            </button>

            <Link to="/register">
              <div className={s.registerWrapper}>
                <span>회원가입</span>
              </div>
            </Link>
            <button className={s.naver}>네이버로 시작하기</button>
            <button className={s.kakao}>카카오로 시작하기</button>
            <button className={s.facebook}>페이스북으로 시작하기</button>
          </div>
        </div>
      );
    }
  }
}
