import React, { Component } from 'react';
import { withReserving } from '../contexts/ReserveContext';
import FirstStep from '../containers/FirstStep';
import SecStep from '../containers/SecStep';

class ReservationSteps extends Component {
  render() {
    return (
      <div>{this.props.step === 'first' ? <FirstStep /> : <SecStep />}</div>
    );
  }
}

export default withReserving(ReservationSteps);
