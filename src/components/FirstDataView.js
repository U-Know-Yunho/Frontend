import React, { Component } from 'react';
import { withReserving } from '../contexts/ReserveContext';
import s from '../scss/FirstDataView.module.scss';

class FirstDataView extends Component {
  render() {
    const {
      subLocation,
      date,
      auditorium,
      time,
      allSeat,
      currentSeatsNo,
    } = this.props;
    return (
      <div className={s.wrapper}>
        <div className={s.place}>
          <p>{subLocation}</p>
          <p>{auditorium}관</p>
          <p>
            잔여 좌석 : {currentSeatsNo} / {allSeat}
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
