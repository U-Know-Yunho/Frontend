import React, { Component } from 'react';
import MovieDetailView from '../components/MovieDetailView';
import { withUser } from '../contexts/UserContext';
import api from '../api';

class MovieDetail extends Component {
  static defaultProps = {
    // 표시해주어야하는 상품의 id
    movieId: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      pk: '',
      title: '',
      director: '',
      casts: '',
      durationMin: '',
      openingDate: '',
      genre: '',
      description: '',
      trailer: '',
      reservationScore: '',
      nowShow: '',
      mainImgUrl: '',
      stillcuts: '',
    };
  }

  async componentDidMount() {
    const { movieId } = this.props;
    const res = await api.get(`/api/movies/detail/${movieId}/`);

    const {
      pk,
      title,
      director,
      casts,
      durationMin,
      openingDate,
      genre,
      description,
      trailer,
      reservationScore,
      mainImgUrl,
      stillcuts,
    } = res.data;

    this.setState({
      pk,
      title,
      director,
      casts,
      durationMin,
      openingDate,
      genre,
      description,
      trailer,
      reservationScore,
      mainImgUrl,
      stillcuts,
    });
  }

  render() {
    return (
      <div>
        <MovieDetailView {...this.state} />
      </div>
    );
  }
}

export default withUser(MovieDetail);
