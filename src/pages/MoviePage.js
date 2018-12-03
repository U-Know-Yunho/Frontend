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
    // MoviePage 링크 : '/movies', 이 페이지에서 개봉예정작 버튼 클릭 시 '/movies/?movie=upcomming'링크로 이동
    // 주소의 쿼리스트링을 {?이름 : 값} 형태로 받아오는 코드
    const { movie } = qs.parse(location.search, { ignoreQueryPrefix: true });
    // '/movies'링크면, 즉 현재 상영작 링크면, movie 에는 null이 담겨있고, 개봉예정작 링크면 movie에는 'upcomming'이 들어가있게된다.

    return (
      <Layout>
        <div className={s.wrapper}>
          {/* movie 값으로 현재 상영작인지 개봉예정작인지 판별하여 타이틀 나타내기  */}
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
          {/* movie가 upcomming이면 그대로 upcomming을 보내고 null이면 'current'를 보냅니다 */}
          <MovieList page="main" movie={movie ? movie : 'current'} />
        </div>
      </Layout>
    );
  }
}
