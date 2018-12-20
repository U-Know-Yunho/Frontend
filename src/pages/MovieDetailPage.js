import React, { Component } from 'react';
import MovieDetail from '../containers/MovieDetail';
import Layout from '../components/Layout';
import s from '../scss/MovieDetailPage.module.scss';

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
