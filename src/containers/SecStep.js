import React, { Component } from 'react';
import NumberView from '../components/NumberView';
import FirstDataView from '../components/FirstDataView';
import Seat from '../containers/Seat';
import s from '../scss/SecStep.module.scss';
import { withReserving } from '../contexts/ReserveContext';

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
            <div className={s.side}>옵션 창입니다</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withReserving(SecStep);
