import React, { Component } from 'react';
import Header from '../containers/Header';
import s from './Layout.module.scss';

export default class Layout extends Component {
  render() {
    return (
      <div className={s.layoutWrapper}>
        <header className={s.header}>
          <Header />
        </header>
        <div className={s.children}>{this.props.children}</div>

        <footer className={s.footer}>
          <div className={s.footerContent}>푸터</div>
        </footer>
      </div>
    );
  }
}
