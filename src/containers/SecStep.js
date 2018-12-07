import React, { Component } from 'react';
import Seat from './Seat';
import ReserveProvider from '../contexts/ReserveContext';
import NumberView from '../components/NumberView';
import FirstDataView from '../components/FirstDataView';
import SeatView from '../components/SeatView';
import s from '../scss/SecStep.module.scss';

export default class SecStep extends Component {
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
  }

  render() {
    return (
      <React.Fragment>
        <ReserveProvider>
          <div className={s.wrapper}>
            <div className={s.firstLine}>
              <NumberView
                selected={this.state.selected}
                onResetSelected={() => this.resetSelected()}
              />
              <FirstDataView />
            </div>
            <SeatView
              key={this.state.seatKey}
              selected={this.state.selected}
              onIncreaseSelect={() => this.handleIncreaseSelect()}
              onDecreaseSelect={() => this.handleDecreaseSelect()}
            />
          </div>
        </ReserveProvider>
      </React.Fragment>
    );
  }
}
