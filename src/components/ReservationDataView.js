import React, { Component } from 'react';
import s from '../scss/ReservationData.module.scss';

export default class ReservationDataView extends Component {
  handleNextStep() {
    const {
      movieTitle,
      location,
      subLocation,
      date,
      time,
      onStep,
    } = this.props;
    // if (
    //   movieTitle !== '' &&
    //   location !== '' &&
    //   subLocation !== '' &&
    //   date !== '' &&
    //   time !== ''
    // ) {
    onStep('sec');
    // } else {
    //   alert('조건을 모두 선택해주세요.');
    // }
  }

  handleThirdStep() {
    const { number, seat, onStep } = this.props;
    if (number > 0 && number === seat.length) {
      onStep('third');
    } else {
      alert('좌석을 인원수에 맞게 선택해주세요.');
    }
  }

  handleReturnTofirst() {
    const { onBackToFirst, onStep } = this.props;
    const res = window.confirm('선택하신 정보가 초기화 됩니다');
    if (res) {
      onBackToFirst();
      onStep('first');
    }
  }
  handleReturnToSec() {
    const { onBackToSec, onStep } = this.props;
    const res = window.confirm('선택하신 좌석 정보가 초기화 됩니다');
    if (res) {
      onBackToSec();
      onStep('sec');
    }
  }

  handleReservation() {
    const { onReserve } = this.props;
    onReserve();
  }
  render() {
    const {
      step,
      movieTitle,
      moviePoster,
      location,
      subLocation,
      auditoriumName,
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
          <div className={s.previousButton}>CGV 홈</div>
        ) : step === 'sec' ? (
          <div
            className={s.previousButton}
            onClick={() => this.handleReturnTofirst()}
          >
            영화
          </div>
        ) : (
          <div
            className={s.previousButton}
            onClick={() => this.handleReturnToSec()}
          >
            좌석
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
                <span className={s.subTitle}>상영관</span> {auditoriumName}
              </li>
            </ul>
          ) : (
            <span className={s.empty}>영화정보</span>
          )}
        </div>
        <div className={s.seatData}>
          {number > 0 ? (
            <ul>
              <li>
                <span className={s.subTitle}>인원</span> {number}명
              </li>
              <li>
                <span className={s.subTitle}>좌석명</span> Standard석
              </li>
              <li>
                <span className={s.subTitle}>번호</span>
                <span>
                  {seat.map((s, i) => (i === seat.length - 1 ? s : s + ', '))}
                </span>
              </li>
              <li>
                <span className={s.priceSubTitle}>총금액 </span>
                <span className={s.price}>
                  {number > 0 && number === seat.length
                    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : 0}{' '}
                  원
                </span>
              </li>
            </ul>
          ) : (
            <span className={s.empty}>좌석선택</span>
          )}
        </div>
        {step === 'first' ? (
          <div className={s.nextButton} onClick={() => this.handleNextStep()}>
            좌석
          </div>
        ) : step === 'sec' ? (
          <div className={s.nextButton} onClick={() => this.handleThirdStep()}>
            결제
          </div>
        ) : (
          <div
            className={s.nextButton}
            onClick={() => this.handleReservation()}
          >
            예매
          </div>
        )}
      </div>
    );
  }
}
