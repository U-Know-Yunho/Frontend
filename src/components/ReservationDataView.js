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
      moviePoster,
      location,
      subLocation,
      date,
      time,
      number,
      seat,
      onStep,
      price,
    } = this.props;
    return (
      <div className={s.dataWrapper}>
        {step === 'first' ? (
          <div className={s.homeButton} onClick={() => onStep('first')}>
            CGV 홈
          </div>
        ) : (
          <div className={s.movieSelectButton} onClick={() => onStep('first')}>
            영화선택
          </div>
        )}
        <div className={s.movieData}>
          {movieTitle ? (
            <>
              <img
                src={moviePoster}
                alt={movieTitle}
                className={s.moviePoster}
              />
              <div className={s.movieInfo}>
                <span className={s.movieTitle}>{movieTitle}</span>
                <span>SCREENX 2D</span>
                <span>12세 관람가</span>
              </div>
            </>
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
        <div className={s.payData}>
          {price ? <span>{price}</span> : <span className={s.empty}>결제</span>}
        </div>
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
