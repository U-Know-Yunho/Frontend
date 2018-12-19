import React, { Component } from 'react';
import s from '../scss/MyCGVLayout.module.scss';
import MyCGVNav from '../containers/MyCGVNav';
import { Redirect } from 'react-router-dom';
import MyMovieProvider from '../contexts/MyMovieContext';

export default class MyCGVLayout extends Component {
  render() {
    return localStorage.getItem('token') ? (
      <MyMovieProvider>
        <div className={s.myCGVWrapper}>
          <h2>My Page</h2>
          <div className={s.myCGVBox}>
            <div className={s.myCGVNav}>
              <MyCGVNav />
            </div>
            <div className={s.myCGVContent}>{this.props.children}</div>
          </div>
        </div>
      </MyMovieProvider>
    ) : (
      <Redirect to="/login" />
    );
  }
}
