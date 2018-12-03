import React, { Component } from 'react';
import Layout from '../components/Layout';
import MovieList from '../containers/MovieList';
import { Link } from 'react-router-dom';
import s from '../scss/HomePage.module.scss';

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
        <main>
          <section className={s.carousel}>Carousel</section>
          <section className={s.movie}>
            <div className={s.movieNav}>
              <button onClick={() => this.handleMovie('current')}>
                현재 상영작
              </button>
              <button onClick={() => this.handleMovie('upcoming')}>
                상영 예정작
              </button>
            </div>
            {movie === 'current' ? (
              <Link to="/movies">전체 보기</Link>
            ) : (
              <Link to="/movies/?type=upcomming">전체 보기</Link>
            )}
            <MovieList page="home" movie={movie} />
          </section>
          <section className={s.trailer}>예고편 Trailer</section>
          <section className={s.event}>Event</section>
        </main>
      </Layout>
    );
  }
}
