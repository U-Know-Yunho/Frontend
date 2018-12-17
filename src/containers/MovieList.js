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
      loading: true,
      list: [],
    };
  }

  async componentDidMount() {
    // 현재 상영작 & 개봉 예정작 판별하여 가지고 있는 전체 영화 리스트 요청
    const { movie } = this.props;
    const { data } =
      movie === 'current'
        ? await api.get('api/movies/', {
            params: {
              nowShow: true,
            },
          })
        : await api.get('api/movies/pre-movies');

    const list = data.results;
    // const list = [
    //   {
    //     id: 1,
    //     title: '죽을래',
    //   },
    //   {
    //     id: 2,
    //     title: '죽을래',
    //   },
    //   {
    //     id: 3,
    //     title: '죽을래',
    //   },
    // ];
    if (this.props.page === 'main') {
      // MoviePage에서의 영화 리스트
      // 전체 리스트 사용
      this.setState({
        list,
      });
    } else if (this.props.page === 'home') {
      // MainPage에서의 영화 리스트
      // 추출된 전체 리스트의 앞 4개로 간추려서 사용
      const homeList = list.slice(0, 4);
      this.setState({
        list: homeList,
      });
    }

    this.setState({
      loading: false,
    });
  }

  render() {
    const { list, loading } = this.state;
    return (
      <MovieListView
        list={list}
        movie={this.props.movie}
        page={this.props.page}
        loading={loading}
      />
    );
  }
}
