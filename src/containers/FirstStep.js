import React, { Component } from 'react';
import api from '../api';
import s from '../scss/FirstStepView.module.scss';
import FirstStepView from '../components/FirstStepView';

export default class FirstStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      lastSelected: '',
      selectedMovieTitle: '',
      selectedSubLocation: '',
      selectedLocation: '',
      selectedDate: '',
      selectedTime: '',
      movieShowList: [],
      movieNoneList: [],
      locationList: [],
      subLocationShowList: [],
      subLocationNoneList: [],
      dateList: [],
      timeList: [],
      handleMovieClick: this.handleMovieClick.bind(this),
      handleLocationClick: this.handleLocationClick.bind(this),
      handleSubLocationClick: this.handleSubLocationClick.bind(this),
      handleDateClick: this.handleDateClick.bind(this),
      handleTimeClick: this.handleTimeClick.bind(this),
      handleInvalidClick: this.handleInvalidClick.bind(this),
    };
  }

  async componentDidMount() {
    // pk 없으면 null
    const {
      pk,
      movieTitle,
      location,
      subLocation,
      date,
      time,
      onLocation,
      firstStepInitialize,
      firstStepReload,
    } = this.props;

    // 초기 리스트 출력
    const res = await api.get('api/tickets/filter/');
    const dataList = res.data;
    this.handleMovieList(dataList.movie);
    this.handleLocationList(dataList.location);
    this.handleDateList(dataList.date);

    // 영화가 선택되어 있으면 그에 따른 극장 리스트 출력
    if (pk && movieTitle === '') {
      this.handleMovieClick(pk);
    } else {
      this.handleLocationClick(dataList.location[0].location);
    }

    // secStep에서 뒤로가기 눌렀을 시
    if (
      movieTitle !== '' &&
      location !== '' &&
      subLocation !== '' &&
      date !== '' &&
      time !== ''
    ) {
      const {
        onMovie,
        onLocation,
        onSubLocation,
        onDate,
        onTime,
        firstStepReload,
        firstStepInitialize,
      } = this.props;
      onMovie('', '');
      onLocation('');
      onSubLocation('');
      onDate('');
      onTime('', '', '', '');

      this.setState({
        selectedMovieTitle: '',
        selectedLocation: '',
        selectedSubLocation: '',
        selectedDate: '',
        selectedTime: '',
      });

      firstStepInitialize(!firstStepReload);
    }
  }

  // 영화를 선택했을 때
  async handleMovieClick(pk) {
    // 1. 상태 저장
    const { onMovie } = this.props;
    const res = await api.get(`/api/movies/detail/${pk}/`);
    const selectTitle = res.data.title;
    const selectPoster = res.data.mainImgUrl;

    onMovie(selectTitle, selectPoster);

    // 2. 선택에 따라 리스트 업데이트
    this.setState(
      {
        lastSelected: 'movie',
        selectedMovieTitle: selectTitle,
      },
      () => this.upLoadList()
    );
  }

  // Location을 선택했을 때
  handleLocationClick(t) {
    const { onLocation, onSubLocation } = this.props;
    onLocation(t);
    onSubLocation('');

    this.setState(
      {
        lastSelected: 'location',
        selectedLocation: t,
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
        lastSelected: 'subLocation',
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
        lastSelected: 'date',
        selectedDate: date,
      },
      () => this.upLoadList()
    );
  }

  // 시간 선택했을 때
  handleTimeClick(time, pk, auditorium, currentSeatsNo) {
    const { onTime } = this.props;
    onTime(time, pk, auditorium, currentSeatsNo);
    this.setState({
      lastSelected: 'time',
      selectedTime: time,
    });
  }

  // 선택 시 리스트 업로드
  async upLoadList() {
    const {
      lastSelected,
      selectedMovieTitle,
      selectedLocation,
      selectedSubLocation,
      selectedDate,
    } = this.state;
    // movie를 제외한 조건으로 무비 리스트 업로드
    // location을 제외한 조건으로 location 리스트 업로드
    // subLocation을 제외한 조건으로 subLocation 리스트 업로드
    // date를 제외한 조건으로 date 리스트 업로드

    const movieParams = new URLSearchParams();
    const locationParams = new URLSearchParams();
    const subLocationParams = new URLSearchParams();
    const dateParams = new URLSearchParams();

    // movie
    if (selectedMovieTitle !== '') {
      locationParams.append('movie', selectedMovieTitle);
      subLocationParams.append('movie', selectedMovieTitle);
      dateParams.append('movie', selectedMovieTitle);
    }
    // location - location 은 늘 선택되어 있으므로 if문 필요 없음.
    movieParams.append('location', selectedLocation);
    subLocationParams.append('location', selectedLocation);
    dateParams.append('location', selectedLocation);
    // subLocation
    if (selectedSubLocation !== '') {
      movieParams.append('subLocation', selectedSubLocation);
      dateParams.append('subLocation', selectedSubLocation);
    }
    // date
    if (selectedDate !== '') {
      movieParams.append('time', selectedDate);
      locationParams.append('time', selectedDate);
      subLocationParams.append('time', selectedDate);
    }

    // 리스트 업데이트
    if (lastSelected !== 'movie') {
      const dataList = await this.getDataList(movieParams);
      this.handleMovieList(dataList.movie);
    }
    if (lastSelected !== 'location') {
      const dataList = await this.getDataList(locationParams);
      this.handleLocationList(dataList.location);
    }
    if (lastSelected !== 'subLocation') {
      const dataList = await this.getDataList(subLocationParams);
      if (dataList.subLocation)
        this.handleSubLocationList(dataList.subLocation);
    }
    if (lastSelected !== 'date') {
      const dataList = await this.getDataList(dateParams);
      this.handleDateList(dataList.date);
    }

    this.isReadyForTimeList();

    console.log('loading false');
    this.setState({
      loading: false,
    });
  }

  async getDataList(params) {
    const res = await api.get('api/tickets/filter/', {
      params,
    });
    return res.data;
  }

  handleMovieList(movieList) {
    const movieShowList = movieList.filter(m => m.show);
    const movieNoneList = movieList.filter(m => !m.show);
    this.setState({
      movieShowList,
      movieNoneList,
    });
  }

  handleLocationList(locationList) {
    this.setState({
      locationList,
    });
  }

  handleSubLocationList(subLocationList) {
    const { lastSelected, selectedSubLocation } = this.state;
    const { onSubLocation } = this.props;
    const subLocationShowList = subLocationList.filter(s => s.show);
    const subLocationNoneList = subLocationList.filter(s => !s.show);
    this.setState({
      subLocationShowList,
      subLocationNoneList,
    });

    // subLocation 처리
    if (lastSelected !== 'subLocation' && selectedSubLocation !== '') {
      const findSubLocation = subLocationList.find(
        s => s.subLocation === selectedSubLocation
      );
      if (findSubLocation && !findSubLocation.show) {
        onSubLocation('');
        this.setState(
          {
            selectedSubLocation: '',
          },
          () => this.upLoadList()
        );
      }
    }
  }

  handleDateList(dateList) {
    this.setState({
      dateList,
    });
  }

  handleTimeList(timeList) {
    this.setState({
      timeList,
    });
  }

  async isReadyForTimeList(timeList) {
    const { movieTitle, location, subLocation, date } = this.props;

    if (movieTitle !== '' && subLocation !== '' && date !== '') {
      const res = await api.get('api/tickets/filter/', {
        params: {
          movie: movieTitle,
          location,
          sub_location: subLocation,
          time: date,
        },
      });
      const timeList = res.data.time;
      this.setState({
        timeList,
      });
    } else {
      this.setState({
        timeList: [],
      });
    }
  }

  async handleInvalidClick() {
    alert('선택된 조건의 상영이 없습니다.\n선택이 초기화됩니다.');

    const {
      onMovie,
      onLocation,
      onSubLocation,
      onDate,
      onTime,
      firstStepReload,
      firstStepInitialize,
    } = this.props;
    onMovie('', '');
    onLocation('');
    onSubLocation('');
    onDate('');
    onTime('', '', '', '');

    this.setState({
      selectedMovieTitle: '',
      selectedLocation: '',
      selectedSubLocation: '',
      selectedDate: '',
      selectedTime: '',
    });

    firstStepInitialize(!firstStepReload);
  }

  render() {
    return (
      <div className={[s.firstStepWrapper]}>
        <div className={s.dataTitlesWrapper}>
          <h3>영화</h3>
          <h3>극장</h3>
          <h3 className={s.dateBoxTitle}>날짜</h3>
          <h3 className={s.timeBoxTitle}>시간</h3>
        </div>
        <FirstStepView {...this.state} {...this.props} />
      </div>
    );
  }
}
