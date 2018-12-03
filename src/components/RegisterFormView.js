import React, { Component } from 'react';
import cx from 'classnames';
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

  handleFieldChange(e, name) {
    // name 변수에 저장되어 있는 문자열을 그대로 속성 이름으로 사용하기
    this.setState({
      [name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
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
    await this.props.onRegister({ ...value });
    // 회원가입이 성공적으로 되었을 때
    this.setState({
      success: true,
    });
  }

  async handleCheckIdButtonClick() {
    const { username } = this.state;
    const message = await this.props.onCheckId(username);
    console.log(message);
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
      return <Redirect to="/" />;
    } else {
      return (
        <div className={cx(s.wrapper, s.registerWrapper)}>
          <form onSubmit={e => this.handleSubmit(e)} className={s.registerBox}>
            <h1>Join</h1>

            <span>Username</span>
            <input
              type="text"
              name="username"
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

            <span>Password</span>
            <input
              value={password}
              type="password"
              name="password"
              onChange={e => this.handleFieldChange(e, 'password')}
              required
            />

            <span>Confirm Password</span>
            <input
              value={confirmPassword}
              type="password"
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

            <span>이름</span>
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              required
            />
            <input
              type="text"
              name="firstname"
              placeholder="Firstname"
              required
            />

            <span>E-MAIL</span>
            <input type="email" name="email" required />

            <span>휴대전화</span>
            <input type="tel" name="phonenumber" required />

            <button className={s.registerBtn}>가입하기</button>
          </form>
        </div>
      );
    }
  }
}
