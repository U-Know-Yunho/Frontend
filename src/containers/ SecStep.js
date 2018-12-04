import React, { Component } from 'react';
import Number from './Number';
import Seat from './Seat';

export default class SecStep extends Component {
  render() {
    return (
      <React.Fragment>
        <Number />
        <Seat />
      </React.Fragment>
    );
  }
}
