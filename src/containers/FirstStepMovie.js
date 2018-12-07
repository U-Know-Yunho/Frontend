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
    //   선택된 무비가 없으면
    const { movieTitle } = this.props;
    if (movieTitle.trim() === '') {
      const { data: list } = await api.get('api/movies/list/');
      console.log(list);
      this.setState({
        selectedMovieList: list,
      });
    }
    // 선택된 무비가 있으면
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
