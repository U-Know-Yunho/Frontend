import React, { Component } from 'react';
import { withReserving } from '../contexts/ReserveContext';
import { Redirect } from 'react-router-dom';
import FirstStep from '../containers/FirstStep';
import SecStep from '../containers/SecStep';
import s from '../scss/ReservationSteps.module.scss';
import ReservationDataView from '../components/ReservationDataView';
import ThirdStep from './ThirdStep';

class ReservationSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstStepReload: false,
      firstStepInitialize: this.firstStepInitialize.bind(this),
    };
  }

  firstStepInitialize(bool) {
    this.setState({
      firstStepReload: bool,
    });
  }

  render() {
    const { reserveSuccess } = this.props;
    return reserveSuccess ? (
      <Redirect to="/myCGV" />
    ) : (
      <div className={s.ReservationStepsWrapper}>
        {this.props.step === 'first' ? (
          <>
            <h1>Reservation</h1>
            <FirstStep
              key={this.state.firstStepReload}
              {...this.props}
              {...this.state}
            />
          </>
        ) : this.props.step === 'sec' ? (
          <>
            <h1>인원/좌석</h1>
            <SecStep {...this.props} />
          </>
        ) : (
          <>
            <h1>결제</h1>
            <ThirdStep {...this.props} />
          </>
        )}
        <ReservationDataView {...this.props} />
      </div>
    );
  }
}

export default withReserving(ReservationSteps);
