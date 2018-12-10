import React, { Component } from 'react';
import cx from 'classnames';
import s from '../scss/RegisterForm.module.scss';

export default class MyInfoView extends Component {
  render() {
    const {
      username,
      password,
      confirmPassword,
      lastname,
      firstname,
      email,
      phonenumber,
      onSubmit,
      onFieldChange,
    } = this.props;
    return (
      <div className={cx(s.wrapper, s.registerWrapper)}>
        <form onSubmit={e => onSubmit(e)} className={s.registerBox}>
          <h1>Info</h1>
          <label for="username">Username</label>
          <div className={s.inputWrapper}>
            <input
              type="text"
              name="username"
              id="username"
              className={s.usernameInput}
              value={username}
              required
              disabled
            />
          </div>

          <label for="password">Password</label>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            onChange={e => onFieldChange(e, 'password')}
            required
          />

          <label for="confirmPassword">Confirm Password</label>
          <div className={s.inputWrapper}>
            <input
              value={confirmPassword}
              type="password"
              id="confirmPassword"
              onChange={e => onFieldChange(e, 'confirmPassword')}
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
            value={lastname}
            required
            disabled
          />
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={firstname}
            required
            disabled
          />

          <label for="email">E-MAIL</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => onFieldChange(e, 'email')}
            required
          />

          <label for="phonenumber">휴대전화</label>
          <input
            type="tel"
            name="phonenumber"
            id="phonenumber"
            value={phonenumber}
            onChange={e => onFieldChange(e, 'phonenumber')}
            required
          />

          <button className={s.registerBtn}>변경하기</button>
        </form>
      </div>
    );
  }
}