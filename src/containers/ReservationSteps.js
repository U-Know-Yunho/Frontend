import React, { Component } from 'react';
import { withReserving } from '../contexts/ReserveContext';
import FirstStep from '../containers/FirstStep';
import SecStep from '../containers/SecStep';
import s from '../scss/ReservationSteps.module.scss';
import ReservationDataView from '../components/ReservationDataView';

class ReservationSteps extends Component {
  render() {
    return (
      <div className={s.ReservationStepsWrapper}>
        <h1>Reservation</h1>
        {this.props.step === 'first' ? (
          <FirstStep {...this.props} />
        ) : (
          <SecStep {...this.props} />
        )}
        <ReservationDataView {...this.props} />
      </div>
    );
  }
}

export default withReserving(ReservationSteps);
