import React, { Component } from 'react';
import s from '../scss/FirstStepDateView.module.scss';

export default class FirstStepDateView extends Component {
  render() {
    return (
      <div className={s.dateBox}>
        <h3>날짜</h3>
        <div>날짜 리스트 뿌리기</div>
      </div>
    );
  }
}
