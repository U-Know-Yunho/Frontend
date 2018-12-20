import React, { Component } from 'react';
import Header from '../containers/Header';
import s from '../scss/Layout.module.scss';

export default class Layout extends Component {
  render() {
    return (
      <div className={s.layoutWrapper}>
        <header className={s.header}>
          <Header />
        </header>
        <div className={s.children}>{this.props.children}</div>
        <footer className={s.footer}>
          <div className={s.footerImg} />
          <div className={s.footerInfo}>
            React | SPA | Context API | RESTful API | SCSS | CSS module | Git &
            Github | Zenhub | Adobe photoshop CC | Adobe illustrator CC
            <span className={s.team}>
              <a
                href="https://github.com/U-Know-Yunho/Frontend"
                target="_blank"
                rel="noopener noreferrer"
              >
                Team Uknow-Yunho : CGV CLONE PROJECT
              </a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}
