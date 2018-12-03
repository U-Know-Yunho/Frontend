import React, { Component } from 'react';
import MovieDetail from '../containers/MovieDetail';
import Layout from '../components/Layout';
// 영화 상세페이지를 보여주기 위한 movieId 받아서 넘기기

export default class MovieDetailPage extends Component {
  render() {
    const { match } = this.props;
    const movieId = match.params.movieId;
    return (
      <Layout>
        <MovieDetail movieId={movieId} />
      </Layout>
    );
  }
}
