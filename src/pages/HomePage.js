import React, { Component } from 'react';
import Layout from '../components/Layout';
import MovieList from '../containers/MovieList';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: 'current',
    };
  }

  handleMovie(movie) {
    this.setState({
      movie: movie,
    });
  }
  render() {
    const { movie } = this.state;
    return (
      <Layout>
        <button onClick={() => this.handleMovie('current')}>현재 상영작</button>
        <button onClick={() => this.handleMovie('upcome')}>상영 예정작</button>
        <MovieList page="home" movie={movie} />
      </Layout>
    );
  }
}
