import React, { Component } from 'react';
import MovieDetailView from '../components/MovieDetailView';
import { withUser } from '../contexts/UserContext';
import api from '../api';
// import { Helmet } from 'react-helmet';

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
      durationMin,
      openingDate,
      genre,
      description,
      trailer,
      reservationScore,
      mainImgUrl,
      stillcuts,
      nowShow,
    } = res.data;

    const directorsImg = res2.data.directors;
    const castsImg = res2.data.casts;

    this.setState({
      pk,
      title,
      directors,
      casts,
      age,
      durationMin,
      openingDate,
      genre,
      description,
      trailer,
      reservationScore,
      mainImgUrl,
      stillcuts,
      nowShow,
      directorsImg,
      castsImg,
      loading: false,
    });
  }

  render() {
    return (
      <div>
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.title}, CGV</title>
        </Helmet> */}
        <MovieDetailView {...this.state} />
      </div>
    );
  }
}

export default withUser(MovieDetail);
