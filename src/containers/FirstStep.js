import React, { Component } from 'react';
import FirstStepView from '../components/FirstStepView';

export default class FirstStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieList: ['가디언즈', '오브', '갤럭시'],
      selectedTheaterList: ['가', '나', '다'],
      selectedDateList: ['오', '늘'],
      handleWithMovie: this.handleWithMovie.bind(this),
      handleWithTheater: this.handleWithTheater.bind(this),
      handleWithDate: this.handleWithDate.bind(this),
    };
  }

  handleWithMovie(m) {
    const { onMovie } = this.props;
    //   movie 선택 시 api 통신해서 TheaterList, DateList 채우기
    //   this.setState
    this.setState({
      selectedTheaterList: ['맛있는', '닭발'],
      selectedDateList: ['000', '111', '222'],
    });
    onMovie(m);
  }

  handleWithTheater(t) {
    const { onTheater } = this.props;
    // console.log(theater);
    //   theater 선택 시 api 통신해서 MovieList, DateList 채우기
    //   this.setState
    this.setState({
      selectedMovieList: ['신비한', '동물', '사전'],
      selectedDateList: ['하하', '호호', '히히'],
    });
    onTheater(t);
  }

  handleWithDate(d) {
    const { onDate } = this.props;
    // console.log(date);
    //   date 선택 시 api 통신해서 MovieList, TheaterList 채우기
    //   this.setState
    this.setState({
      selectedMovieList: ['하울의', '움직이는', '성'],
      selectedTheaterList: ['강아지', '뽀삐'],
    });
    onDate(d);
  }

  render() {
    return (
      <div>
        <FirstStepView {...this.state} />
      </div>
    );
  }
}
