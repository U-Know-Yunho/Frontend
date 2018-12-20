import React, { Component } from 'react';
import { withMyMovie } from '../contexts/MyMovieContext';
import MyMovieView from '../components/MyMovieView';
import api from '../api';

class ReservedList extends Component {
  async handleCancel(pk) {
    await api.patch(`api/members/reservations/${pk}`);
    this.props.getData();
  }

  render() {
    return (
      <MyMovieView
        list={this.props.readyList}
        page={'reserved'}
        handleCancel={pk => this.handleCancel(pk)}
      />
    );
  }
}

export default withMyMovie(ReservedList);
