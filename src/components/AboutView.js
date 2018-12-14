import React, { Component } from 'react';
import s from '../scss/AboutView.module.scss';

export default class AboutView extends Component {
  render() {
    const { memberData } = this.props;
    return (
      <div className={s.AboutBox}>
        <h3>유노윤호들</h3>
        <div className={s.members}>
          {memberData.map(m => (
            <div className={s.member}>
              <img src={m.img} alt={m.name} className={s.image} />
              <span>{m.name}</span>
              <span>[{m.role}]</span>
              <span>{m.comment}</span>
              <button>버튼1</button>
              <button>버튼2</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
