import React, { Component } from 'react';
import s from '../scss/Seat.module.scss';

export default class Seat extends Component {
  render() {
    const seatArr = [
      [{ row: 1, number: 1 }, { row: 1, number: 2 }],
      [{ row: 2, number: 1 }, { row: 2, number: 2 }],
      [{ row: 3, number: 1 }, { row: 3, number: 2 }],
    ];
    return (
      <div className={s.secondLine}>
        <div className={s.seat}>좌석 선택창이 구현 될 예정입니다.</div>
        <div className={s.side}>옵션 창입니다</div>
      </div>
    );
  }
}
