import React, { Component } from 'react';
import MyMovieView from './MyMovieView';
import { withMyMovie } from '../contexts/MyMovieContext';

class CancledList extends Component {
  render() {
    return <MyMovieView list={this.props.cancledList} />;
  }
}

export default withMyMovie(CancledList);
