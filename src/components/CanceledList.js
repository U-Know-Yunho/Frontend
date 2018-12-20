import React, { Component } from 'react';
import MyMovieView from './MyMovieView';
import { withMyMovie } from '../contexts/MyMovieContext';

class CanceledList extends Component {
  render() {
    return <MyMovieView list={this.props.canceledList} page={'canceled'} />;
  }
}

export default withMyMovie(CanceledList);
