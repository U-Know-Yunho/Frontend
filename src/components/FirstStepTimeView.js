import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepTimeView extends Component {
  render() {
    return (
      <div className={s.eachDataBox}>
        <h3>시간</h3>
        <div>ㅅㅣ간 리스트 뿌리기</div>
      </div>
    );
  }
}
