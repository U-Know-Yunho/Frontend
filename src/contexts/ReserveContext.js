import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext();

export default class ReserveProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step: first -> step1, step: sec -> step2 컴포를 화면에 그림
      step: 'sec',
      // 영화, 극장, 날짜, 시간, 인원수, 좌석
      // 선택된 영화 제목
      movieTitle: '',
      // 선택된 영화 포스터
      moviePoster: '',
      // 'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%B3%B4%ED%97%A4%EB%AF%B8%EC%95%88%20%EB%9E%A9%EC%86%8C%EB%94%94/%EB%B3%B4%ED%97%A4%EB%AF%B8%EC%95%88_%EB%9E%A9%EC%86%8C%EB%94%94.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181206%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181206T061347Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=9a5676ef4af21e9640739b3f124ed8188e105b712cfb8faaff287ee2dbd02545',
      // 선택된 극장
      location: '',
      subLocation: '',
      // 선택된 날짜
      date: '',
      // 선택된 관, 시간, 총 좌석, 남은 좌석
      auditorium: '',
      currentSeatsNo: '',
      time: '',
      timePk: null,
      allSeat: 100,
      // 선택된 인원수
      number: 0,
      // 선택된 좌석
      seat: [],
      // 선택된 좌석에 따른 가격
      price: 0,
      // 상태 변경 함수들
      onNumber: this.onNumber.bind(this),
      onMovie: this.onMovie.bind(this),
      onLocation: this.onLocation.bind(this),
      onSubLocation: this.onSubLocation.bind(this),
      onDate: this.onDate.bind(this),
      onTime: this.onTime.bind(this),
      onStep: this.onStep.bind(this),
      onSeatAdd: this.onSeatAdd.bind(this),
      onSeatDel: this.onSeatDel.bind(this),
      onSeatReset: this.onSeatReset.bind(this),
      onPricePlus: this.onPricePlus.bind(this),
      onPriceSub: this.onPriceSub.bind(this),
      onPriceReset: this.onPriceReset.bind(this),
    };
  }

  onStep(step) {
    this.setState({
      step,
    });
  }

  onMovie(movieTitle, moviePoster = '') {
    this.setState({
      movieTitle,
      moviePoster,
    });
  }

  onLocation(location) {
    this.setState({
      location,
    });
  }

  onSubLocation(subLocation) {
    this.setState({
      subLocation,
    });
  }

  onDate(date) {
    this.setState({
      date,
    });
  }

  onTime(time, timePk, auditorium, currentSeatsNo) {
    this.setState({
      time,
      timePk,
      auditorium,
      currentSeatsNo,
    });
  }

  onNumber(number) {
    this.setState({
      number,
    });
  }
  // 좌석 상태 변경
  onSeatAdd(seatName) {
    console.log(seatName);
    const seat = this.state.seat;
    seat.push(seatName);
    seat.sort(function(x, y) {
      //FIXME: 좌석 배열 추가시 알파벳 비교 조건 완성하기
      if (x[0].localeCompare(y[0]) === 0) {
        if (x.slice(1) - y.slice(1) < 0) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
    this.setState({
      seat,
    });
  }
  onSeatDel(seatName) {
    const seat = this.state.seat.filter(i => i !== seatName);
    this.setState({
      seat,
    });
  }

  onSeatReset() {
    this.setState({
      seat: [],
    });
  }

  // 가격 상태 변경
  onPricePlus() {
    const price = this.state.price;
    this.setState({
      price: price + 7000,
    });
  }
  onPriceSub() {
    const price = this.state.price;
    this.setState({
      price: price - 7000,
    });
  }
  onPriceReset() {
    this.setState({
      price: 0,
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withReserving(WrappedComponent) {
  return function WithReserving(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { ReserveProvider, Consumer as ReserveConsumer, withReserving };
