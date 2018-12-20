import React, { Component } from 'react';
import api from '../api';
const { Provider, Consumer } = React.createContext();

export default class MyMovieProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 예매 내역 정보들이 완벽히 가져오기 전까지는 로딩 중, 다 가져와지면 false로 변환
      listsLoading: true,
      readyList: [],
      seenList: [],
      canceledList: [],
      getData: this.getData.bind(this),
    };
  }

  async componentDidMount() {
    this.getData();
  }

  async getData() {
    if (localStorage.getItem('token')) {
      // 실제 가져올 데이터
      const { data } = await api.get('api/members/reservations/1');

      // 오늘 날짜 셋팅
      let today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let date = today.getDate();
      if (date < 10) {
        date = '0' + date;
      }
      if (month < 10) {
        month = '0' + month;
      }
      today = `${year}-${month}-${date}`;

      // 상영일이 지나지 않은 예매 내역
      const readyList = data
        .filter(l => l.screeningSet.time > today)
        .filter(l => l.isActive)
        .reverse();

      // 상영일이 지난 내가 본 영화 내역
      const seenList = data
        .filter(l => l.screeningSet.time < today)
        .filter(l => l.isActive)
        .reverse();

      // 상영일과 관계없이 취소된 내역
      const canceledList = data.filter(l => !l.isActive).reverse();

      this.setState({
        readyList,
        seenList,
        canceledList,
        listsLoading: false,
      });
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withMyMovie(WrappedComponent) {
  return function withMyMovie(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { MyMovieProvider, Consumer as MyMovieConsumer, withMyMovie };
