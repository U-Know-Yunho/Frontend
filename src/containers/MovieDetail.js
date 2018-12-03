import React, { Component } from 'react';
import MovieDetailView from '../components/MovieDetailView';
import { withUser } from '../contexts/UserContext';

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const { movieId } = this.props;
  }
  render() {
    return (
      <>
        <MovieDetailView />;
      </>
    );
  }
}

export default withUser(MovieDetail);
