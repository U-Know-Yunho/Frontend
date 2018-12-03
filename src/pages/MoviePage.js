import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../containers/MovieList';
import Layout from '../components/Layout';
import qs from 'qs';
import s from '../scss/MoviePage.module.scss';
import classNames from 'classnames';

export default class MoviePage extends Component {
  render() {
    const { location } = this.props;
    // 개봉 예정작을 판별하는 데이터 속성이 movie일 경우로 가정
    // movie 속성 값 추출 (upcomming) 후 movie 변수에 대입
    // 개봉예정작 링크 클릭 시 개봉 예정작 리스트를 불러올 조건
    const { movie } = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (
      <Layout>
        <div className={s.wrapper}>
          {!movie ? <h2>MOVIE CHART</h2> : <h2>UPCOMMING</h2>}
          <nav className={s.nav}>
            <Link to="/movies" className={classNames({ [s.active]: !movie })}>
              현재상영작
            </Link>
            <Link
              to="/movies/?movie=upcomming"
              className={classNames({ [s.active]: movie })}
            >
              개봉예정작
            </Link>
          </nav>
          {/* movie가 upcomming이면 변수 movie가 truthy로 upcomming을 보내고 current면 null, 즉 falsy이므로 'current'를 보냅니다 */}
          <MovieList page="main" movie={movie ? movie : 'current'} />
        </div>
      </Layout>
    );
  }
}
