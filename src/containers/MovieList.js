import React, { Component } from 'react';
import MovieListView from '../components/MovieListView';
import api from '../api';

export default class MovieList extends Component {
  // 받는 prop : page와 movie
  // page: main -> /movie 경로, MoviePage 상태(전체 리스트)
  // page: home -> / 경로, MainPage 상태(리스트 중 4개)
  // movie: movies -> 리스트 종류 현재 상영작
  // movie: movies/pre -> 리스트 종류 개봉 예정작

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      next: '',
    };
  }

  async componentDidMount() {
    // 현재 상영작 & 개봉 예정작 판별하여 가지고 있는 전체 영화 리스트 요청
    const { movie } = this.props;
    const { data } = await api.get(`api/${movie}/`);

    const list = data.results;
    const next = data.next;
    if (this.props.page === 'main') {
      // MoviePage에서의 영화 리스트
      // 전체 리스트 사용
      this.setState({
        list,
        next,
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
  // 더보기 버튼 클릭시 실행되는 함수
  async handleViewMore() {
    const nextUrl = this.state.next;
    const nowList = this.state.list;
    const { data } = await api.get(nextUrl, {
      baseURL: '',
    });
    const list = nowList.concat(data.results);
    const next = data.next;
    this.setState({
      list,
      next,
    });
  }

  render() {
    const { list, loading, next } = this.state;
    return (
      <MovieListView
        next={next}
        list={list}
        movie={this.props.movie}
        page={this.props.page}
        loading={loading}
        onViewMore={() => this.handleViewMore()}
      />
    );
  }
}
