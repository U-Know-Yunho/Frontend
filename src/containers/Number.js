import React, { Component } from 'react';
import NumberView from '../components/NumberView';

export default class Number extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     number: 0,
  //   };
  // }
  // 현재 선택된 인원수를 상태에 기억합니다.
  // handleNumber(e) {
  //   const number = e.target.value;
  //   this.setState({
  //     number,
  //   });
  // }

  // 해당 인원 수 선택 상태와 함수는 ReserveContext에 저장될 예정입니다
  render() {
    return <NumberView />;
  }
}
