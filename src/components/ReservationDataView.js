import React, { Component } from 'react';
import s from '../scss/ReservationData.module.scss';
import { withReserving } from '../contexts/ReserveContext';

export default class ReservationDataView extends Component {
  //   handleEmptyString(str) {
  //     console.log(str);
  //     return str.trim() === '';
  //   }

  handleNextStep() {
    const {
      movieTitle,
      location,
      subLocation,
      date,
      time,
      onStep,
    } = this.props;
    if (
      movieTitle !== '' &&
      location !== '' &&
      subLocation !== '' &&
      date !== '' &&
      time !== ''
    ) {
      onStep('sec');
    } else {
      alert('영화, 극장, 시간을 선택해주세요.');
    }
  }

  render() {
    const {
      step,
      movieTitle,
      moviePoster,
      location,
      subLocation,
      auditorium,
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
          {subLocation && date && time ? (
            <ul>
              <li>
                <span className={s.subTitle}>극장</span> {subLocation}
              </li>
              <li>
                <span className={s.subTitle}>일시</span> {date}
              </li>
              <li>
                <span className={s.subTitle}> </span> {time}
              </li>
              <li>
                <span className={s.subTitle}>상영관</span> {auditorium}관
              </li>
              <li>
                <span className={s.subTitle}>인원</span> {number}명
              </li>
            </ul>
          ) : (
            <span className={s.empty}>영화정보</span>
          )}
        </div>
        <div className={s.seatData}>
          {seat ? (
            <ul>
              <li>
                <span className={s.subTitle}>좌석명</span> Standard석
              </li>
              <li>
                <span className={s.subTitle}>좌석번호</span>
                {seat.map(s => s + ' ')}
              </li>
            </ul>
          ) : (
            <span className={s.empty}>좌석선택</span>
          )}
        </div>
        <div className={s.payData}>
          {price ? <span>{price}</span> : <span className={s.empty}>결제</span>}
        </div>
        {step === 'first' ? (
          <div
            className={s.seatSelectButton}
            onClick={() => this.handleNextStep()}
          >
            좌석선택
          </div>
        ) : (
          <div className={s.goReserveButton}>예매하기</div>
        )}
      </div>
    );
  }
}
