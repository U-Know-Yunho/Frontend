import React, { Component } from 'react';
import MovieListView from '../components/MovieListView';
import api from '../api';

export default class MovieList extends Component {
  // 받는 prop : page와 movie
  // page: main -> /movie 경로, MoviePage 상태(전체 리스트)
  // page: home -> / 경로, MainPage 상태(리스트 중 4개)
  // movie: current -> 리스트 종류 현재 상영작
  // movie: upcomming -> 리스트 종류 개봉 예정작

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    // 현재 상영작 & 개봉 예정작 판별하여 가지고 있는 전체 영화 리스트 요청
    const { movie } = this.props;
    const res = api.get(
      '/movies/list/'
      // {
      //   params: {
      //     // 현재 상영작 & 개봉 예정작 판별 조건
      //     // now_show: true -> 현재상영작
      //     // now_show: false -> 개봉예정작
      //     // now_show: (movie === 'current'? true : false)
      //   },
      // }
    );
    console.log(res);
    const list = [
      {
        pk: 8,
        title: '완벽한 타인',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%EC%99%84%EB%B2%BD%ED%95%9C%20%ED%83%80%EC%9D%B8/%EC%99%84%EB%B2%BD%ED%95%9C_%ED%83%80%EC%9D%B8.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=161f30eea2c3c36ec207c49f6d66c506e8676eecf0b59ee871a4258923173f8d',
        now_show: false,
        opening_date: '2018-10-31',
      },
      {
        pk: 7,
        title: '브로크백 마운틴',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%B8%8C%EB%A1%9C%ED%81%AC%EB%B0%B1%20%EB%A7%88%EC%9A%B4%ED%8B%B4/%EB%B8%8C%EB%A1%9C%ED%81%AC%EB%B0%B1_%EB%A7%88%EC%9A%B4%ED%8B%B4.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8f9b8428bc76b0724a473643532c8e7ac4ac30d10e4569b05bb8020937c5aebb',
        now_show: false,
        opening_date: '2018-12-05',
      },
      {
        pk: 6,
        title: '신비한 동물들과 그린델왈드의 범죄',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%EC%8B%A0%EB%B9%84%ED%95%9C%20%EB%8F%99%EB%AC%BC%EB%93%A4%EA%B3%BC%20%EA%B7%B8%EB%A6%B0%EB%8D%B8%EC%99%88%EB%93%9C%EC%9D%98%20%EB%B2%94%EC%A3%84/%EC%8B%A0%EB%B9%84%ED%95%9C_%EB%8F%99%EB%AC%BC%EB%93%A4%EA%B3%BC_%EA%B7%B8%EB%A6%B0%EB%8D%B8%EC%99%88%EB%93%9C%EC%9D%98_%EB%B2%94%EC%A3%84.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=99c7033f243bbd4459f67646138b08abbc266431dcda2a6ca9783654ee5e95ca',
        now_show: false,
        opening_date: '2018-11-14',
      },
      {
        pk: 5,
        title: '후드',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%ED%9B%84%EB%93%9C/%ED%9B%84%EB%93%9C.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d5869199ee288b00699ffd38de72e017a31ba00765412956696240132c60092f',
        now_show: false,
        opening_date: '2018-11-28',
      },
      {
        pk: 4,
        title: '호두까기 인형과 4개의 왕국',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%ED%98%B8%EB%91%90%EA%B9%8C%EA%B8%B0%20%EC%9D%B8%ED%98%95%EA%B3%BC%204%EA%B0%9C%EC%9D%98%20%EC%99%95%EA%B5%AD/%ED%98%B8%EB%91%90%EA%B9%8C%EA%B8%B0_%EC%9D%B8%ED%98%95%EA%B3%BC_4%EA%B0%9C%EC%9D%98_%EC%99%95%EA%B5%AD.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=812ee458a65c0ff82f4dd6c79f19b3609274d24efe750beb3aa1e552eb86fc38',
        now_show: false,
        opening_date: '2018-12-06',
      },
      {
        pk: 3,
        title: '모털 엔진',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%AA%A8%ED%84%B8%20%EC%97%94%EC%A7%84/%EB%AA%A8%ED%84%B8_%EC%97%94%EC%A7%84.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5dac57ce89921bfd7f72a96a177f5297ba6acc71fc982a054c393297e4675554',
        now_show: false,
        opening_date: '2018-12-05',
      },
      {
        pk: 2,
        title: '국가부도의 날',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%EA%B5%AD%EA%B0%80%EB%B6%80%EB%8F%84%EC%9D%98%20%EB%82%A0/%EA%B5%AD%EA%B0%80%EB%B6%80%EB%8F%84%EC%9D%98_%EB%82%A0.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f893f0c1912d83b88905e08e0c400fa5c85d5f8cd93a00a5d6a63a7515a7a58',
        now_show: false,
        opening_date: '2018-11-28',
      },
      {
        pk: 1,
        title: '보헤미안 랩소디',
        reservation_score: 0,
        main_img_url:
          'https://wps-9th-practice1.s3.amazonaws.com/media/%EB%B3%B4%ED%97%A4%EB%AF%B8%EC%95%88%20%EB%9E%A9%EC%86%8C%EB%94%94/%EB%B3%B4%ED%97%A4%EB%AF%B8%EC%95%88_%EB%9E%A9%EC%86%8C%EB%94%94_frTF1U9.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJUQTVUBEK4SPUPKA%2F20181204%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20181204T031904Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c9171f1ca65ebf26052885e32166e7dd56f93552c363d69d471ca80dcb4e34f8',
        now_show: false,
        opening_date: '2018-10-31',
      },
    ];

    if (this.props.page === 'main') {
      // MoviePage에서의 영화 리스트
      // 전체 리스트 사용
      // this.setState({
      //   list: 추출된 배열 전체
      // })
      this.setState({
        list,
      });
    } else if (this.props.page === 'home') {
      // MainPage에서의 영화 리스트
      // 추출된 전체 리스트의 앞 4개로 간추려서 사용
      // const list = 추출된 배열.slice(0, 4)
      // this.setState({
      //   list
      // })
      const homeList = list.slice(0, 4);
      this.setState({
        list: homeList,
      });
    }
  }

  render() {
    return <MovieListView list={this.state.list} movie={this.props.movie} />;
  }
}
