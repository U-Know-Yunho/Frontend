import React, { Component } from 'react';
import s from '../scss/AboutView.module.scss';

export default class AboutView extends Component {
  render() {
    const { memberData } = this.props;
    return (
      <div className={s.AboutBox}>
        <h3>열정 지기</h3>
        <div className={s.members}>
          {memberData.map(m => (
            <div className={s.member} key={m.name}>
              <img src={m.img} alt={m.name} className={s.image} />
              <span>{m.name}</span>
              <span>[{m.role}]</span>
              {m.comment.map((c, i) => (
                <span key={i}>{c}</span>
              ))}
              <div className={s.button}>
                <a href={m.git} target="_blank" rel="noopener noreferrer">
                  GITHUB
                </a>
                <a href="" target="_blank" rel="noopener noreferrer">
                  찜하기
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
