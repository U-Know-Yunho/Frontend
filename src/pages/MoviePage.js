import React, { Component } from 'react';
import MovieList from '../containers/MovieList';

export default class MoviePage extends Component {
  render() {
    return <MovieList page="movie" />;
  }
}
