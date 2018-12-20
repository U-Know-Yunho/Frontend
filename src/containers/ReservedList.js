import React, { Component } from 'react';
import { withMyMovie } from '../contexts/MyMovieContext';
import MyMovieView from '../components/MyMovieView';
import api from '../api';

class ReservedList extends Component {
  async handleCancel(pk) {
    const { isAnythingCanceled, onIsAnythingCanceled } = this.props;
    const res = await api.patch(`api/members/reservations/${pk}`);
    console.log(res.data);
    onIsAnythingCanceled(!isAnythingCanceled);
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
