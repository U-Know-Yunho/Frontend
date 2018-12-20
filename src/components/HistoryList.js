import React, { Component } from 'react';
import MyMovieView from './MyMovieView';
import { withMyMovie } from '../contexts/MyMovieContext';

class HistoryList extends Component {
  render() {
    return <MyMovieView list={this.props.seenList} page={'history'} />;
  }
}

export default withMyMovie(HistoryList);
