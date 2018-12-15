import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext();

export default class ReserveProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step: first -> step1, step: sec -> step2 컴포를 화면에 그림
      step: 'first',
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
      auditorium: '2관',
      time: '20:00',
      allSeat: 100,
      ableSeat: 77,
      // 선택된 인원수
      number: 0,
      // 선택된 좌석
      seat: '',
      // 선택된 좌석에 따른 가격
      price: null,
      // 상태 변경 함수들
      onNumber: this.onNumber.bind(this),
      onMovieTitle: this.onMovieTitle.bind(this),
      onMoviePoster: this.onMoviePoster.bind(this),
      onLocation: this.onLocation.bind(this),
      onSubLocation: this.onSubLocation.bind(this),
      onDate: this.onDate.bind(this),
      onStep: this.onStep.bind(this),
    };
  }

  onStep(step) {
    this.setState({
      step,
    });
  }

  onMoviePoster(moviePoster) {
    this.setState({
      moviePoster,
    });
  }

  onMovieTitle(movieTitle) {
    this.setState({
      movieTitle,
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

  onNumber(number) {
    this.setState({
      number,
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
