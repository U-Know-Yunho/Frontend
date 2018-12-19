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
      age: '',
      directors: '',
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
      loading: true,
      directorsImg: [],
      castsImg: [],
    };
  }

  async componentDidMount() {
    const { movieId } = this.props;
    const res = await api.get(`/api/movies/detail/${movieId}/`);
    const res2 = await api.get(`/api/movies/staff/${movieId}/`);

    const {
      pk,
      title,
      directors,
      casts,
      age,
      duration_min,
      opening_date,
      genre,
      description,
      trailer,
      reservation_score,
      main_img_url,
      stillcuts,
      now_show,
    } = res.data;

    const directorsImg = res2.data.directors;
    const castsImg = res2.data.casts;

    this.setState({
      pk,
      title,
      directors,
      casts,
      age,
      durationMin: duration_min,
      openingDate: opening_date,
      genre,
      description,
      trailer,
      reservationScore: reservation_score,
      mainImgUrl: main_img_url,
      stillcuts,
      loading: false,
      nowShow: now_show,
      directorsImg,
      castsImg,
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
