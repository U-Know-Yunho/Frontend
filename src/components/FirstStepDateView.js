import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepDateView extends Component {
  render() {
    return (
      <div className={s.eachDataBox}>
        <h3>날짜</h3>
        <div>날짜 리스트 뿌리기</div>
      </div>
    );
  }
}
