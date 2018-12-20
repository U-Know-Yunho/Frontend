import React, { Component } from 'react';
import s from '../scss/Header.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withUser } from '../contexts/UserContext';
import { withRouter } from 'react-router-dom';
import menu from '../scss/menu.png';
import close from '../scss/btn_close.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  handleMenuActive() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    const { isLogin, logout, history, firstName, lastName } = this.props;
    const currentLocation = this.props.location.pathname;
    return (
      <div className={classNames(s.menuBar, { [s.active]: this.state.active })}>
        <img
          src={menu}
          alt="모바일메뉴버튼"
          className={s.menuButton}
          onClick={() => this.handleMenuActive()}
        />
        <Link to="/" className={s.logo}>
          Home
        </Link>
        <div className={classNames(s.menu)}>
          {lastName !== '' && firstName !== '' && (
            <Link to="/myCGV/info" className={s.username}>
              {lastName}
              {firstName}님
            </Link>
          )}
          <img
            src={close}
            alt="모바일메뉴 닫힘 버튼"
            className={s.menuClose}
            onClick={() => this.handleMenuActive()}
          />
          <Link
            to="/movies"
            className={classNames([s.link], {
              [s.HeaderFocus]:
                currentLocation === '/movies' || currentLocation === '/movies/',
            })}
          >
            Movie
          </Link>
          <Link
            to="/reservation"
            className={classNames([s.link], {
              [s.HeaderFocus]: currentLocation === '/reservation',
            })}
          >
            Reservation
          </Link>
          {isLogin ? (
            <>
              <button
                onClick={() => {
                  logout();
                  history.push('/');
                }}
                className={s.link}
              >
                Logout
              </button>
              <Link
                to="/myCGV"
                className={classNames([s.link], {
                  [s.HeaderFocus]: currentLocation === '/myCGV',
                })}
              >
                myCGV
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={classNames([s.link], {
                  [s.HeaderFocus]: currentLocation === '/login',
                })}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={classNames([s.link], {
                  [s.HeaderFocus]: currentLocation === '/register',
                })}
              >
                Join
              </Link>
            </>
          )}
          <Link
            to="/about"
            className={classNames([s.link], {
              [s.HeaderFocus]: currentLocation === '/about',
            })}
          >
            About
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(withUser(Header));
