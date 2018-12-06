import React, { Component } from 'react';
import Number from './Number';
import Seat from './Seat';
import ReserveProvider from '../contexts/ReserveContext';

export default class SecStep extends Component {
  render() {
    return (
      <React.Fragment>
        <ReserveProvider>
          <Number />
          <Seat />
        </ReserveProvider>
      </React.Fragment>
    );
  }
}
