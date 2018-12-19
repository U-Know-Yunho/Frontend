import React, { Component } from 'react';
import EachSeat from '../components/EachSeat';
import { withReserving } from '../contexts/ReserveContext';
import s from '../scss/SeatView.module.scss';
import api from '../api';

class Seat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seatArr: [],
      // seatArr: [
      //   [
      //     {
      //       pk: 1,
      //       row: 1,
      //       number: 1,
      //       seatName: 'A1',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 2,
      //       row: 1,
      //       number: 2,
      //       seatName: 'A2',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 3,
      //       row: 1,
      //       number: 3,
      //       seatName: 'A3',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 4,
      //       row: 1,
      //       number: 4,
      //       seatName: 'A4',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 5,
      //       row: 1,
      //       number: 5,
      //       seatName: 'A5',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 6,
      //       row: 1,
      //       number: 6,
      //       seatName: 'A6',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 7,
      //       row: 1,
      //       number: 7,
      //       seatName: 'A7',
      //       reservationCheck: false,
      //     },
      //     {
      //       pk: 8,
      //       row: 1,
      //       number: 8,
      //       seatName: 'A8',
      //       reservationCheck: true,
      //     },
      //     {
      //       pk: 9,
      //       row: 1,
      //       number: 9,
      //       seatName: 'A9',
      //       reservationCheck: true,
      //     },
      //     {
      //       pk: 10,
      //       row: 1,
      //       number: 10,
      //       seatName: 'A10',
      //       reservationCheck: false,
      //     },
      //   ],
      // ],
    };
  }

  async componentDidMount() {
    const pk = this.props.timePk;
    console.log(pk);
    const { data } = await api.get(`api/tickets/seats/${pk}/`);
    // const { data } = await api.get(`api/tickets/seats/100/`);
    const seatArr = [];
    for (let i = 1; i <= data[data.length - 1].row; i++) {
      seatArr.push(data.filter(item => item.row === i));
    }
    this.setState({
      seatArr,
    });
  }
  render() {
    const {
      number,
      onIncreaseSelect,
      onDecreaseSelect,
      selected,
      onSeatAdd,
      onSeatDel,
      onPricePlus,
      onPriceSub,
    } = this.props;
    const { seatArr } = this.state;
    return (
      <div className={s.seatWrapper}>
        <div className={s.screen}>SCREEN</div>
        <div className={s.seatArea}>
          {seatArr.map((rowItem, index) => (
            <div className={s.row} key={index}>
              {rowItem.map(i => (
                <EachSeat
                  key={i.pk}
                  seatPk={i.pk}
                  seatName={i.seatName}
                  isReserved={i.reservationCheck}
                  number={number}
                  onIncreaseSelect={() => onIncreaseSelect()}
                  onDecreaseSelect={() => onDecreaseSelect()}
                  selected={selected}
                  onSeatAdd={(seatName, seatPk) => onSeatAdd(seatName, seatPk)}
                  onSeatDel={(seatName, seatPk) => onSeatDel(seatName, seatPk)}
                  onPricePlus={() => onPricePlus()}
                  onPriceSub={() => onPriceSub()}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withReserving(Seat);
