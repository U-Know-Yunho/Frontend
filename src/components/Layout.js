import React, { Component } from 'react';
import Header from '../containers/Header';
import classNames from 'classnames';
import './Layout.scss';

export default class Layout extends Component {
  render() {
    const wrapper = classNames('wrapper');
    const footer = classNames('footer');
    return (
      <div className={wrapper}>
        <Header />
        {this.props.children}

        <footer className={footer}>푸터</footer>
      </div>
    );
  }
}
