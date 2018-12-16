import React, { Component } from 'react';
import FirstStepTime from './FirstStepTime';
import s from '../scss/FirstStep.module.scss';
import api from '../api';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import FirstStepMovieView from '../components/FirstStepMovieView';
import FirstStepDateView from '../components/FirstStepDateView';

export default class FirstStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovieTitle: '',
      selectedSubLocation: '',
      selectedLocation: '',
      selectedDate: '',
      movieShowList: [],
      movieNoneList: [],
      dateList: [],
      locationList: [],
      subLocationShowList: [],
      subLocationNoneList: [],
      handleMovieClick: this.handleMovieClick.bind(this),
      handleDateClick: this.handleDateClick.bind(this),
      handleLocationClick: this.handleLocationClick.bind(this),
      handleSubLocationClick: this.handleSubLocationClick.bind(this),
    };
  }

  async componentDidMount() {
    // pk 없으면 null
    const { pk } = this.props;

    // 초기 리스트 출력
    const res = await api.get('api/tickets/filter/');
    const dataTmp = res.data;
    this.handleMovieList(dataTmp.movie);
    this.handleDateList(dataTmp.date);
    this.handleLocationList(dataTmp.theater);

    // 영화가 선택되어 있으면 그에 따른 극장 리스트 출력
    if (pk) {
      this.handleMovieClick(pk);
    }
  }

  // 1. dataBar 에 선택한 데이터 업로드
  // 2. 선택시 바뀌는 리스트 가져오기
  //       - 한개 선택 시 고려
  //       - 두개 선택 시 고려
  // 3. 리스트가 가져왔을 때에도 유효한 선택이면 유지
  //       - 유효한 선택이 아니면 선택 해지시키기
  // 4. 유지, 해지에 맞게 dataBar에 상태 업로드, 데이터바 표시
  // 5. 세 개 모두 유효한 선택 시 시간 나타남.
  // 6. 시간까지 선택 시, 좌석으로 넘어갈 수 있음.

  // 영화를 선택했을 때
  async handleMovieClick(pk) {
    // 1. 상태 저장
    const { onMovieTitle, onMoviePoster } = this.props;
    const res = await api.get(`/api/movies/detail/${pk}/`);
    const selectTitle = res.data.title;
    const selectPoster = res.data.mainImgUrl;
    onMovieTitle(selectTitle);
    onMoviePoster(selectPoster);

    // // 임시
    // onMovieTitle(pk);
    // onMoviePoster(pk);
    // 2. 선택에 따라 리스트 업데이트
    this.setState(
      {
        selectedMovieTitle: pk,
      },
      () => this.upLoadList()
    );
  }

  // Location을 선택했을 때
  handleLocationClick(t) {
    const { onLocation, onSubLocation } = this.props;
    onLocation(t[0].location);
    onSubLocation('');

    const subLocationShowList = t[1].theaterSet.filter(s => s.show);
    const subLocationNoneList = t[1].theaterSet.filter(s => !s.show);
    this.setState({
      subLocationShowList,
      subLocationNoneList,
    });

    this.setState(
      {
        selectedLocation: t[0].location,
        selectedSubLocation: '',
      },
      () => this.upLoadList()
    );
  }

  // subLocation을 선택했을 때
  handleSubLocationClick(t) {
    // 1. 선택한 subLocation 상태 저장
    const { onSubLocation } = this.props;
    onSubLocation(t);
    // 2. 선택에 따라 리스트 업데이트
    this.setState(
      {
        selectedSubLocation: t,
      },
      () => this.upLoadList()
    );
  }

  // 날짜를 선택했을 때
  handleDateClick(date) {
    // 1. 선택한 날짜 상태 저장
    const { onDate } = this.props;
    onDate(date);
    // 2. 선택에 따라 리스트 업데이트
    this.setState(
      {
        selectedDate: date,
      },
      () => this.upLoadList()
    );
  }

  // 선택 시 리스트 업로드
  async upLoadList() {
    const {
      selectedMovieTitle,
      selectedLocation,
      selectedSubLocation,
      selectedDate,
    } = this.state;

    const params = new URLSearchParams();
    // 무비만 선택되어 있을 때
    if (selectedMovieTitle !== '') {
      params.append('movie', selectedMovieTitle);
    }
    // 극장이 선택되어 있을 때
    if (selectedLocation !== '') {
      params.append('location', selectedLocation);
    }
    // 극장이 선택되어 있을 때
    if (selectedSubLocation !== '') {
      params.append('subLocation', selectedSubLocation);
    }
    // 날짜가 선택되어 있을 때
    if (selectedDate !== '') {
      params.append('date', selectedDate);
    }

    console.log(params.toString());

    const res = await api.get('api/tickets/filter/', {
      params,
    });

    const dataTmp = res.data;
    this.handleMovieList(dataTmp.movie);
    this.handleLocationList(dataTmp.theater);
    this.handleDateList(dataTmp.date);
  }

  handleDateList(dateList) {
    this.setState({
      dateList,
    });
  }

  handleLocationList(locationList) {
    this.setState({
      locationList,
    });
  }

  handleMovieList(data) {
    const movieShowList = data.filter(s => s.show);
    const movieNoneList = data.filter(s => !s.show);
    this.setState({
      movieShowList,
      movieNoneList,
    });
  }

  render() {
    return (
      <div className={s.firstStepWrapper}>
        <FirstStepMovieView {...this.props} {...this.state} />
        <FirstStepTheaterView {...this.props} {...this.state} />
        <FirstStepDateView {...this.props} {...this.state} />
        <FirstStepTime {...this.props} />
      </div>
    );
  }
}
