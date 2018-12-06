import React, { Component } from 'react';
import { withReserving } from '../contexts/ReserveContext';
import s from '../scss/FirstDataView.module.scss';

class FirstDataView extends Component {
  render() {
    const { theater, date, auditorium, time, allSeat, ableSeat } = this.props;
    return (
      <div className={s.wrapper}>
        <div className={s.place}>
          <p>{theater}</p>
          <p>{auditorium}</p>
          <p>
            잔여 좌석 : {ableSeat} / {allSeat}
          </p>
        </div>
        <p className={s.schedule}>
          {date} {time}
        </p>
      </div>
    );
  }
}

export default withReserving(FirstDataView);
