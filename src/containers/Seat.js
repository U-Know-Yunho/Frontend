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
    };
  }

  async componentDidMount() {
    const pk = this.props.timePk;
    const { data } = await api.get(`api/tickets/seats/${pk}/`);
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
