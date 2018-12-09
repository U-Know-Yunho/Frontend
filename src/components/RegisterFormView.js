import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import s from '../scss/RegisterForm.module.scss';

export default class RegisterFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isIdConfirmed: null,
      password: '',
      username: '',
      confirmPassword: '',
      success: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleFieldChange(e, name) {
    // name 변수에 저장되어 있는 문자열을 그대로 속성 이름으로 사용하기
    this.setState({
      [name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.isIdConfirmed) {
      const username = e.target.elements.username.value;
      const password = e.target.elements.password.value;
      const firstname = e.target.elements.firstname.value;
      const lastname = e.target.elements.lastname.value;
      const email = e.target.elements.email.value;
      const phonenumber = e.target.elements.phonenumber.value;

      const { ...value } = {
        username,
        password,
        firstname,
        lastname,
        email,
        phonenumber,
      };

      try {
        await this.props.onRegister({ ...value });
        // 회원가입이 성공적으로 되었을 때
        this.setState({
          success: true,
        });
      } catch {
        alert('잘못 입력했습니다.');
      }
    }
  }

  async handleCheckIdButtonClick() {
    const { username } = this.state;
    const message = await this.props.onCheckId(username);
    if (message === '사용 가능한 아이디입니다.') {
      this.setState({
        isIdConfirmed: true,
      });
    } else {
      this.setState({
        isIdConfirmed: false,
      });
    }
  }

  render() {
    const { isIdConfirmed, success, password, confirmPassword } = this.state;
    if (success) {
      return <Redirect to="/login" />;
    } else {
      return (
        <>
          <form onSubmit={e => this.handleSubmit(e)} className={s.registerBox}>
            <h1>Join</h1>
            <label for="username">Username</label>
            <div className={s.inputWrapper}>
              <input
                type="text"
                name="username"
                id="username"
                className={s.usernameInput}
                onChange={e => this.handleFieldChange(e, 'username')}
                required
              />

              <button
                type="button"
                onClick={() => this.handleCheckIdButtonClick()}
                className={s.checkIdBtn}
              >
                중복체크
              </button>
              {isIdConfirmed === null ? (
                <span className={s.default}>아이디 중복체크를 해주세요</span>
              ) : isIdConfirmed ? (
                <span className={s.correct}>사용 가능한 아이디입니다</span>
              ) : (
                <span className={s.wrong}>이미 존재하는 아이디입니다</span>
              )}
            </div>

            <label for="password">Password</label>
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              onChange={e => this.handleFieldChange(e, 'password')}
              required
            />

            <label for="confirmPassword">Confirm Password</label>
            <div className={s.inputWrapper}>
              <input
                value={confirmPassword}
                type="password"
                id="confirmPassword"
                onChange={e => this.handleFieldChange(e, 'confirmPassword')}
                required
              />

              {confirmPassword === '' ? (
                <span className={s.default}>비밀번호를 확인해주세요</span>
              ) : confirmPassword === password ? (
                <span className={s.correct}>비밀번호가 일치합니다</span>
              ) : (
                <span className={s.wrong}>비밀번호가 일치하지 않습니다</span>
              )}
            </div>

            <label for="lastname">이름</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Lastname"
            />
            <input type="text" name="firstname" placeholder="Firstname" />

            <label for="email">E-MAIL</label>
            <input type="email" name="email" id="email" />

            <label for="phonenumber">휴대전화</label>
            <input type="tel" name="phonenumber" id="phonenumber" />

            <button className={s.registerBtn}>가입하기</button>

            <Link to="/login">
              <div className={s.loginWrapper}>
                <span>로그인</span>
              </div>
            </Link>
          </form>
        </>
      );
    }
  }
}
