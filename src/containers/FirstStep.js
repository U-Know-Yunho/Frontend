import React, { Component } from 'react';
import s from '../scss/FirstStep.module.scss';
import api from '../api';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import FirstStepMovieView from '../components/FirstStepMovieView';
import FirstStepDateView from '../components/FirstStepDateView';
import FirstStepTimeView from '../components/FirstStepTimeView';
import { decode } from 'punycode';

export default class FirstStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    } = this.props;

    // 초기 리스트 출력
    const res = await api.get('api/tickets/filter/');
    const dataTmp = res.data;
    this.handleMovieList(dataTmp.movie);
    this.handleLocationList(dataTmp.location);
    this.handleDateList(dataTmp.date);

    const res2 = await api.get('api/tickets/filter/', {
      params: {
        location: dataTmp.location[0].location,
      },
    });
    this.handleLocationClick(dataTmp.location[0]);

    // secStep에서 뒤로가기 눌렀을 시
    // if (
    //   movieTitle !== '' &&
    //   location !== '' &&
    //   subLocation !== '' &&
    //   date !== '' &&
    //   time !== ''
    // ) {
    //   this.setState(
    //     {
    //       selectedMovieTitle: movieTitle,
    //       selectedLocation: location,
    //       selectedSubLocation: subLocation,
    //       selectedDate: date,
    //       selectedTime: time,
    //     },
    //     () => this.upLoadList()
    //   );
    // }

    // 영화가 선택되어 있으면 그에 따른 극장 리스트 출력
    if (pk && movieTitle === '') {
      this.handleMovieClick(pk);
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
    onLocation(t.location);
    onSubLocation('');

    this.setState(
      {
        lastSelected: 'location',
        selectedLocation: t.location,
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
      () => this.upLoadList(false)
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

    const uniParams = new URLSearchParams();
    const params = new URLSearchParams();

    if (lastSelected === 'movie') {
      uniParams.append('movie', selectedMovieTitle);
    } else if (lastSelected === 'location') {
      uniParams.append('location', selectedLocation);
    } else if (lastSelected === 'subLocation') {
      uniParams.append('subLocation', selectedSubLocation);
    } else if (lastSelected === 'date') {
      uniParams.append('time', selectedDate);
    }

    if (selectedMovieTitle !== '') {
      params.append('movie', selectedMovieTitle);
    }
    if (selectedLocation !== '') {
      params.append('location', selectedLocation);
    }
    if (selectedSubLocation !== '') {
      params.append('sub_location', selectedSubLocation);
    }
    if (selectedDate !== '') {
      params.append('time', selectedDate);
    }

    const res = await api.get('api/tickets/filter/', {
      params: uniParams,
    });
    const res2 = await api.get('api/tickets/filter/', {
      params,
    });

    const dataTmp = res.data;
    const dataTmp2 = res2.data;

    if (lastSelected !== 'movie') {
      // 기존에 선택된게 있으면
      if (selectedMovieTitle !== '') {
        this.handleMovieList(dataTmp.movie);
        this.isSelectedDataValidate(dataTmp);
      } else {
        // 기존에 선택된게 없으면
        this.handleMovieList(dataTmp2.movie);
      }
    }

    if (lastSelected !== 'location' && lastSelected !== 'subLocation') {
      // 기존에 선택된게 있으면

      if (selectedLocation !== '') {
        this.handleLocationList(dataTmp.location);
        this.isSelectedDataValidate(dataTmp);
      } else {
        // 기존에 선택된게 없으면
        this.handleLocationList(dataTmp2.location);
      }
    } else if (
      lastSelected === 'location' &&
      selectedMovieTitle === '' &&
      selectedLocation !== '' &&
      selectedSubLocation === '' &&
      selectedDate === ''
    ) {
      const res = await api.get('api/tickets/filter/');
      this.handleLocationList(res.data.location);
    }

    if (lastSelected !== 'subLocation' && selectedLocation !== '') {
      const { onSubLocation } = this.props;
      onSubLocation('');
      this.setState(
        {
          selectedSubLocation: '',
        },
        () => this.handleSubLocationList(dataTmp2.subLocation)
      );
    }

    if (lastSelected !== 'date') {
      // 기존에 선택된게 있으면
      if (selectedDate !== '') {
        this.handleDateList(dataTmp.date);
        this.isSelectedDataValidate(dataTmp);
      } else {
        // 기존에 선택된게 없으면
        this.handleDateList(dataTmp2.date);
      }
    }

    if (dataTmp2.time) {
      console.log('세개다선택됨');
      this.isReadyForTimeList(dataTmp2.time);
    }
  }

  // 기존 선택되어있던 데이터 초기화 또는 유지 처리
  async isSelectedDataValidate(dataTmp) {
    const {
      lastSelected,
      selectedMovieTitle,
      selectedLocation,
      selectedSubLocation,
      selectedDate,
      selectedTime,
    } = this.state;
    const { onMovie, onLocation, onSubLocation, onDate, onTime } = this.props;

    // movie 처리
    if (lastSelected !== 'movie' && selectedMovieTitle !== '') {
      const findMovie = dataTmp.movie.find(m => m.title === selectedMovieTitle);
      if (findMovie && !findMovie.show) {
        onMovie('', '');
        this.setState(
          {
            selectedMovieTitle: '',
          },
          () => this.upLoadList()
        );
      }
    }

    // date 처리
    if (lastSelected !== 'date' && selectedDate !== '') {
      const findDate = dataTmp.date.find(d => d[0].date === selectedDate);
      if (findDate && !findDate[1].show) {
        onDate('');
        this.setState(
          {
            selectedDate: '',
          },
          () => this.upLoadList()
        );
      }
    }
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
      this.setState({
        timeList,
      });
    } else {
      this.setState({
        timeList: [],
      });
    }
  }

  render() {
    return (
      <div className={s.firstStepWrapper}>
        <FirstStepMovieView {...this.props} {...this.state} />
        <FirstStepTheaterView {...this.props} {...this.state} />
        <FirstStepDateView {...this.props} {...this.state} />
        <FirstStepTimeView {...this.props} {...this.state} />
      </div>
    );
  }
}
