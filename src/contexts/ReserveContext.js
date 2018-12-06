import React, { Component } from 'react';
const { Provider, Consumer } = React.createContext();

export default class ReserveProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step: first -> step1, step: sec -> step2 컴포를 화면에 그림
      step: 'first',
      // 영화, 극장, 날짜, 시간, 인원수, 좌석
      movie: '',
      theater: '',
      date: '',
      time: '',
      number: 0,
      seat: '',
      onNumber: this.onNumber.bind(this),
      onMovie: this.onMovie.bind(this),
      onTheater: this.onTheater.bind(this),
      onDate: this.onDate.bind(this),
    };
  }

  onMovie(movie) {
    this.setState({
      movie,
    });
  }

  onTheater(theater) {
    this.setState({
      theater,
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
