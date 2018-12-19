import React, { Component } from 'react';
import s from '../scss/MyMovieView.module.scss';

export default class MyMovieView extends Component {
  render() {
    const { list, page } = this.props;
    return (
      <div className={s.wrapper}>
        {list.map(l => (
          <div className={s.movie}>
            <img
              src={l.screeningSet.imgUrl}
              alt="영화 포스터"
              className={s.poster}
            />
            <div className={s.info}>
              <p className={s.title}>{l.screeningSet.title}</p>
              <p>SCREENX 2D</p>
              <p className={s.date}>{l.screeningSet.time}</p>
              <p className={s.theater}>CGV{l.screeningSet.theater}</p>
              <p className={s.num}>인원 {l.num}명</p>
              {page === 'history' ? (
                <p className={s.seat}>
                  좌석 {l.seatsReserved.map(s => s.seatName + ' ')}
                </p>
              ) : (
                <p className={s.cancle}>취소</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
