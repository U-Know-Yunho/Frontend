import React, { Component } from 'react';
import Seat from './Seat';
import ReserveProvider from '../contexts/ReserveContext';
import NumberView from '../components/NumberView';
import FirstDataView from '../components/FirstDataView';
import s from '../scss/SecStep.module.scss';

export default class SecStep extends Component {
  render() {
    return (
      <React.Fragment>
        <ReserveProvider>
          <div className={s.wrapper}>
            <div className={s.firstLine}>
              <NumberView />
              <FirstDataView />
            </div>
            <Seat />
          </div>
        </ReserveProvider>
      </React.Fragment>
    );
  }
}
