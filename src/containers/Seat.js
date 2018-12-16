import React, { Component } from 'react';
import SeatView from '../components/SeatView';

export default class Seat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seatArr: [],
    };
  }

  componentDidMount() {}
  render() {
    return <SeatView />;
  }
}
