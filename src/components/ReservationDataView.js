import React, { Component } from 'react';
import s from '../scss/ReservationData.module.scss';

export default class ReservationDataView extends Component {
  //   handleEmptyString(str) {
  //     console.log(str);
  //     return str.trim() === '';
  //   }

  render() {
    const {
      step,
      movieTitle,
      location,
      subLocation,
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
          {movieTitle ? (
            <span>{movieTitle}</span>
          ) : (
            <span className={s.empty}>영화선택</span>
          )}
        </div>
        <div className={s.basicData}>
          {location && date && time ? (
            <ul>
              <li>
                {location} {subLocation}
              </li>
              <li>
                {date} {time}
              </li>
            </ul>
          ) : (
            <span className={s.empty}>영화정보</span>
          )}
        </div>
        <div className={s.seatData}>
          {seat ? (
            <span>{seat}</span>
          ) : (
            <span className={s.empty}>좌석선택</span>
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
