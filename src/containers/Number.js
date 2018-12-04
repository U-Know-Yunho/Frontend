import React, { Component } from 'react';
import NumberView from '../components/NumberView';
export default class Number extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0,
    };
  }
  // 현재 선택된 인원수를 상태에 기억합니다.
  handleNumber(e) {
    const number = e.target.value;
    this.setState({
      number,
    });
  }
  render() {
    return (
      <NumberView
        number={this.state.number}
        onNumber={e => this.handleNumber(e)}
      />
    );
  }
}
