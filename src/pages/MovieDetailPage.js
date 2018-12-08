import React, { Component } from 'react';
import MovieDetail from '../containers/MovieDetail';
import Layout from '../components/Layout';
import s from '../scss/MovieDetailPage.module.scss';
// 영화 상세페이지를 보여주기 위한 movieId 받아서 넘기기

export default class MovieDetailPage extends Component {
  render() {
    const { match } = this.props;
    const movieId = match.params.movieId;
    return (
      <Layout>
        <div className={s.movieDetailWrapper}>
          <h2>Movie Detail</h2>
          <MovieDetail movieId={movieId} />
        </div>
      </Layout>
    );
  }
}
