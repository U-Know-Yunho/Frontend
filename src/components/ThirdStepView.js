import React, { Component } from 'react';
import s from '../scss/ThirdStepView.module.scss';

export default class ThirdStepView extends Component {
  render() {
    return (
      <div className={s.thirdBox}>
        <h2>결제 수단 선택</h2>
        <span>테스트</span>
      </div>
    );
  }
}
