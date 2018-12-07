import React, { Component } from 'react';
import s from '../scss/ReservationData.module.scss';

export default class ReservationDataView extends Component {
  handleEmptyString(str) {
    return str.trim() === '';
  }

  render() {
    const {
      step,
      movie,
      theater,
      date,
      time,
      number,
      seat,
      onStep,
    } = this.props;
    return (
      <div className={s.dataWrapper}>
        {step === 'first' ? null : (
          <div className={s.movieSelectButton} onClick={() => onStep('first')}>
            영화선택
          </div>
        )}
        <div className={s.movieData}>
          {this.handleEmptyString(movie) ? (
            <span className={s.empty}>영화선택</span>
          ) : (
            <span>{movie}</span>
          )}
        </div>
        <div className={s.basicData}>
          {this.handleEmptyString(theater) &&
          this.handleEmptyString(date) &&
          this.handleEmptyString(time) ? (
            <span className={s.empty}>영화정보</span>
          ) : (
            <ul>
              <li>{theater}</li>
              <li>
                {date} {time}
              </li>
            </ul>
          )}
        </div>
        <div className={s.seatData}>
          {this.handleEmptyString(seat) ? (
            <span className={s.empty}>좌석선택</span>
          ) : (
            <span>{seat}</span>
          )}
        </div>
        <div className={s.payData}>결제</div>
        {step === 'first' ? (
          <div className={s.seatSelectButton} onClick={() => onStep('sec')}>
            좌석선택
          </div>
        ) : (
          <div className={s.goReserveButton}>예매하기</div>
        )}
      </div>
    );
  }
}
