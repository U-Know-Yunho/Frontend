import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepView extends Component {
  render() {
    return (
      <div className={s.firstStepWrapper}>
        <h1>Reservation</h1>
        <div className={s.FirstStepBox}>
          <div className={s.FirstStepMovie}>
            <span>영화</span>movie
          </div>
          <div className={s.FirstStepTheater}>
            <span>극장</span>theater
          </div>
          <div className={s.FirstStepDate}>
            <span>날짜</span>date
          </div>
          <div className={s.FirstStepTime}>
            <span>시간</span>time
          </div>
        </div>
      </div>
    );
  }
}
