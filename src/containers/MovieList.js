import React, { Component } from 'react';
import MovieListView from '../components/MovieListView';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  // page: main -> /movie 경로, MoviePage 상태(전체 리스트)
  // page: home -> / 경로, MainPage 상태(리스트 중 4개)
  // movie: current -> 리스트 종류 현재 상영작
  // movie: upcomming -> 리스트 종류 개봉 예정작

  componentDidMount() {
    // 현재 상영작 & 개봉 예정작 판별하여 가지고 있는 전체 영화 리스트 요청
    // const { movie } = this.props;
    // const { data: 영화 리스트 배열 } = api.get('/movies', {
    //   params: {
    //     // 현재 상영작 & 개봉 예정작 판별 조건
    //     // movie: movie
    //   },
    // });
    const list = [
      {
        id: 1,
        title: '보헤미안',
        postImg:
          'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000081/81127/81127_185.jpg',
      },
      {
        id: 2,
        title: '랩',
        postImg:
          'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000081/81127/81127_185.jpg',
      },
      {
        id: 3,
        title: '소디',
        postImg:
          'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000081/81127/81127_185.jpg',
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
      const homeList = list.slice(0, 2);
      this.setState({
        list: homeList,
      });
    }
  }

  render() {
    return <MovieListView list={this.state.list} movie={this.props.movie} />;
  }
}
