import React, { Component } from 'react';
import EachSeat from './EachSeat';
import { withReserving } from '../contexts/ReserveContext';
import s from '../scss/SeatView.module.scss';

class SeatView extends Component {
  render() {
    const seatArr = [
      [
        { row: 1, number: 1, isReserved: true },
        { row: 1, number: 2, isReserved: false },
      ],
      [
        { row: 2, number: 1, isReserved: false },
        { row: 2, number: 2, isReserved: false },
      ],
      [
        { row: 3, number: 1, isReserved: true },
        { row: 3, number: 2, isReserved: false },
      ],
    ];
    const { number, onIncreaseSelect, onDecreaseSelect, selected } = this.props;
    return (
      <div className={s.secondLine}>
        <div className={s.seatArea}>
          {seatArr.map((rowItem, index) => (
            <div className={s.row} key={index}>
              {rowItem.map(i => (
                <EachSeat
                  key={`${i.row}${i.number}`}
                  row={i.row}
                  colNum={i.number}
                  isReserved={i.isReserved}
                  number={number}
                  onIncreaseSelect={() => onIncreaseSelect()}
                  onDecreaseSelect={() => onDecreaseSelect()}
                  selected={selected}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={s.side}>옵션 창입니다</div>
      </div>
    );
  }
}

export default withReserving(SeatView);
