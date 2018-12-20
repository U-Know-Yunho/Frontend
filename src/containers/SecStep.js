import React, { Component } from 'react';
import NumberView from '../components/NumberView';
import FirstDataView from '../components/FirstDataView';
import Seat from '../containers/Seat';
import s from '../scss/SecStep.module.scss';
import { withReserving } from '../contexts/ReserveContext';
import seatAble from '../scss/seat_able.png';
import seatSelected from '../scss/seat_selected.png';
import seatDisabled from '../scss/seat_disabled.png';

class SecStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      seatKey: false,
    };
  }

  handleIncreaseSelect() {
    this.setState(prevState => ({
      selected: prevState.selected + 1,
    }));
  }

  handleDecreaseSelect() {
    this.setState(prevState => ({
      selected: prevState.selected - 1,
    }));
  }

  resetSelected() {
    this.setState(prevState => ({
      selected: 0,
      seatKey: !prevState.seatKey,
    }));
    this.props.onSeatReset();
  }

  render() {
    return (
      <React.Fragment>
        <div className={s.wrapper}>
          <div className={s.firstLine}>
            <NumberView
              selected={this.state.selected}
              onResetSelected={() => this.resetSelected()}
            />
            <FirstDataView />
          </div>
          <div className={s.secondLine}>
            <Seat
              key={this.state.seatKey}
              selected={this.state.selected}
              onIncreaseSelect={() => this.handleIncreaseSelect()}
              onDecreaseSelect={() => this.handleDecreaseSelect()}
            />
            <div className={s.side}>
              <figure>
                <img src={seatSelected} alt="선택중인 좌석" />
                <p>선택</p>
              </figure>
              <figure>
                <img src={seatDisabled} alt="선택중인 좌석" />
                <p>선택 불가</p>
              </figure>
              <figure>
                <img src={seatAble} alt="선택중인 좌석" />
                <p>선택 가능</p>
              </figure>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withReserving(SecStep);
