import React, { Component } from 'react';
import Layout from '../components/Layout';
import MovieList from '../containers/MovieList';
import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';

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
        <div className={s.carousel}>Carousel</div>
        <div className={s.wrapper}>
          <button onClick={() => this.handleMovie('current')}>
            현재 상영작
          </button>
          <button onClick={() => this.handleMovie('upcome')}>
            상영 예정작
          </button>
          {movie === 'current' ? (
            <Link to="/movies">전체 보기</Link>
          ) : (
            <Link to="/movies/?type=upcomming">전체 보기</Link>
          )}
          <MovieList page="home" movie={movie} />
        </div>
        <div className={s.trailer}>예고편 Trailer</div>
        <div className={s.event}>Event</div>
      </Layout>
    );
  }
}
