import React, { Component } from 'react';
import s from '../scss/AboutView.module.scss';

export default class AboutView extends Component {
  render() {
    const { memberData } = this.props;
    return (
      <div className={s.AboutBox}>
        <span>유노윤호들</span>
        <div className={s.members}>
          {memberData.map(m => (
            <div className={s.member}>{m.name}</div>
          ))}
        </div>
      </div>
    );
  }
}
