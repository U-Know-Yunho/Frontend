import React, { Component } from 'react';
import classNames from 'classnames';
import './Header.scss';
import { Link } from 'react-router-dom';

export default class HeaderView extends Component {
  render() {
    const menuBar = classNames('menu-bar');
    return (
      <div className={menuBar}>
        <div className="logo">
          <Link to="/">Home</Link>
        </div>
        <div className="menu">
          <Link to="/movies" className="link">
            Movie
          </Link>
          <Link to="/reservation" className="link">
            Reservation
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
          <Link to="/register" className="link">
            Join
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
        </div>
      </div>
    );
  }
}
