import React, { Component } from 'react';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';

export default class HeaderView extends Component {
  render() {
    const { isLogin, logout, history } = this.props;
    return (
      <div className={s.menuBar}>
        <Link to="/" className={s.logo}>
          Home
        </Link>
        <div className={s.menu}>
          <Link to="/movies" className={s.link}>
            Movie
          </Link>
          <Link to="/reservation" className={s.link}>
            Reservation
          </Link>
          {isLogin ? (
            <button
              onClick={() => {
                logout();
                history.push('/');
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className={s.link}>
              Login
            </Link>
          )}

          <Link to="/register" className={s.link}>
            Join
          </Link>
          <Link to="/about" className={s.link}>
            About
          </Link>
        </div>
      </div>
    );
  }
}
