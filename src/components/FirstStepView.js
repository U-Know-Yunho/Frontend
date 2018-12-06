import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepView extends Component {
  onClickMovie(m) {
    const { handleWithMovie } = this.props;
    handleWithMovie(m);
  }

  onClickTheater(t) {
    const { handleWithTheater } = this.props;
    handleWithTheater(t);
  }

  onClickDate(d) {
    const { handleWithDate } = this.props;
    handleWithDate(d);
  }

  render() {
    const {
      selectedMovieList,
      selectedTheaterList,
      selectedDateList,
    } = this.props;

    return (
      <div className={s.firstStepWrapper}>
        <h1>Reservation</h1>
        <div className={s.FirstStepBox}>
          <div className={s.FirstStepMovie}>
            <span>영화</span>
            <ul>
              {selectedMovieList.map(m => (
                <li key={m} onClick={() => this.onClickMovie(m)}>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.FirstStepTheater}>
            <span>극장</span>
            <ul>
              {selectedTheaterList.map(t => (
                <li key={t} onClick={() => this.onClickTheater(t)}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.FirstStepDate}>
            <span>날짜</span>
            <ul>
              {selectedDateList.map(d => (
                <li key={d} onClick={() => this.onClickDate(d)}>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.FirstStepTime}>
            <span>시간</span>
            <ul>
              <li>time</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
