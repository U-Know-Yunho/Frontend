import React, { Component } from 'react';
import FirstStepMovieView from '../components/FirstStepMovieView';
import api from '../api';

export default class FirstStepMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieList: [],
    };
  }

  async componentDidMount() {
    const { pk, onMovieTitle, onMoviePoster } = this.props;
    const { data: list } = await api.get('api/movies/list/');

    this.setState({
      selectedMovieList: list,
    });
    //   선택된 무비가 있으면
    if (pk) {
      const s = list.find(l => l.pk.toString() === pk);
      onMovieTitle(s.title);
      onMoviePoster(s.mainImgUrl);
    }
  }
  render() {
    const { selectedMovieList } = this.state;
    return (
      <FirstStepMovieView
        selectedMovieList={selectedMovieList}
        {...this.props}
      />
    );
  }
}
