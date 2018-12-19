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
      cancledList: [],
    };
  }

  async componentWillMount() {
    if (localStorage.getItem('token')) {
      // const { data } = await api.get('api/members/reservations/1');
      const data = [
        {
          pk: 17,
          screeningSet: {
            imgUrl:
              'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%A9%94%EB%A6%AC%20%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98%20%ED%83%84%EC%83%9D/%EB%A9%94%EB%A6%AC_%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98_%ED%83%84%EC%83%9D.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181219%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181219T094112Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=62e252f3f593c0bd7c371e9ab81bba76444a3e21fc1f8e34a01ac921a5899397',
            thumbImgUrl:
              'https://wps-9th-practice1.s3.amazonaws.com/media/CACHE/images/%EB%A9%94%EB%A6%AC%20%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98%20%ED%83%84%EC%83%9D/%EB%A9%94%EB%A6%AC_%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98_%ED%83%84%EC%83%9D/3da84a88ebe64a09f4acffe977d32db3.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181219%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181219T094112Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=eab059322755a906e6fc32af2f3a8e1ef8db6f41a9acb0c47fd948cbbc4e7d28',
            title: '메리 셸리-프랑켄슈타인의 탄생',
            age: '15세 이상',
            theater: '신당점',
            time: '2018-12-18 02:00',
          },
          num: 1,
          seatsReserved: [
            {
              seatName: 'A1',
            },
          ],
          isActive: true,
        },
        {
          pk: 18,
          screeningSet: {
            imgUrl:
              'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%A9%94%EB%A6%AC%20%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98%20%ED%83%84%EC%83%9D/%EB%A9%94%EB%A6%AC_%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98_%ED%83%84%EC%83%9D.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181219%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181219T094112Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=62e252f3f593c0bd7c371e9ab81bba76444a3e21fc1f8e34a01ac921a5899397',
            thumbImgUrl:
              'https://wps-9th-practice1.s3.amazonaws.com/media/CACHE/images/%EB%A9%94%EB%A6%AC%20%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98%20%ED%83%84%EC%83%9D/%EB%A9%94%EB%A6%AC_%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98_%ED%83%84%EC%83%9D/3da84a88ebe64a09f4acffe977d32db3.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181219%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181219T094112Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=eab059322755a906e6fc32af2f3a8e1ef8db6f41a9acb0c47fd948cbbc4e7d28',
            title: '메리 셸리-프랑켄슈타인의 탄생',
            age: '15세 이상',
            theater: '신당점',
            time: '2018-12-18 02:00',
          },
          num: 2,
          seatsReserved: [
            {
              seatName: 'A2',
            },
            {
              seatName: 'A3',
            },
          ],
          isActive: false,
        },
        {
          pk: 20,
          screeningSet: {
            imgUrl:
              'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%A9%94%EB%A6%AC%20%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98%20%ED%83%84%EC%83%9D/%EB%A9%94%EB%A6%AC_%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98_%ED%83%84%EC%83%9D.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181219%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181219T094112Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=62e252f3f593c0bd7c371e9ab81bba76444a3e21fc1f8e34a01ac921a5899397',
            thumbImgUrl:
              'https://wps-9th-practice1.s3.amazonaws.com/media/CACHE/images/%EB%A9%94%EB%A6%AC%20%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98%20%ED%83%84%EC%83%9D/%EB%A9%94%EB%A6%AC_%EC%85%B8%EB%A6%AC-%ED%94%84%EB%9E%91%EC%BC%84%EC%8A%88%ED%83%80%EC%9D%B8%EC%9D%98_%ED%83%84%EC%83%9D/3da84a88ebe64a09f4acffe977d32db3.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181219%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181219T094112Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=eab059322755a906e6fc32af2f3a8e1ef8db6f41a9acb0c47fd948cbbc4e7d28',
            title: '메리 셸리-프랑켄슈타인의 탄생',
            age: '15세 이상',
            theater: '신당점',
            time: '2018-12-30 02:00',
          },
          num: 2,
          seatsReserved: [
            {
              seatName: 'E10',
            },
            {
              seatName: 'D10',
            },
          ],
          isActive: true,
        },
      ];
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
        .filter(l => l.isActive);

      // 상영일이 지난 내가 본 영화 내역
      const seenList = data
        .filter(l => l.screeningSet.time < today)
        .filter(l => l.isActive);

      // 상영일과 관계없이 취소된 내역
      const cancledList = data.filter(l => !l.isActive);

      this.setState({
        readyList,
        seenList,
        cancledList,
        listsLoading: false,
      });
    }
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

function withMyMovie(WrappedComponent) {
  return function WithReserving(props) {
    return (
      <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
    );
  };
}

export { MyMovieProvider, Consumer as MyMovieConsumer, withMyMovie };
