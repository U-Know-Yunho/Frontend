import React, { Component } from 'react';
import MyMovieView from './MyMovieView';
import { withMyMovie } from '../contexts/MyMovieContext';
import withLoading from '../hoc/withLoading';

class HistoryList extends Component {
  render() {
    return <MyMovieView list={this.props.seenList} />;
  }
}

export default withLoading(withMyMovie(HistoryList));
