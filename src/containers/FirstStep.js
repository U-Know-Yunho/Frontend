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
    const { pk, movieTitle, location, subLocation, date, time } = this.props;

    // 초기 리스트 출력
    const res = await api.get('api/tickets/filter/');
    const dataTmp = res.data;
    this.handleMovieList(dataTmp.movie);
    this.handleLocationList(dataTmp.location);
    this.handleDateList(dataTmp.date);

    // secStep에서 뒤로가기 눌렀을 시
    if (
      movieTitle !== '' &&
      location !== '' &&
      subLocation !== '' &&
      date !== '' &&
      time !== ''
    ) {
      this.setState(
        {
          selectedMovieTitle: movieTitle,
          selectedLocation: location,
          selectedSubLocation: subLocation,
          selectedDate: date,
          selectedTime: time,
        },
        () => this.upLoadList()
      );
    }

    // 영화가 선택되어 있으면 그에 따른 극장 리스트 출력
    if (pk && movieTitle === '') {
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

    const params = new URLSearchParams();
    // 무비만 선택되어 있을 때
    if (selectedMovieTitle !== '') {
      params.append('movie', selectedMovieTitle);
    }
    // location이 선택되어 있을 때
    // if (selectedLocation !== '') {
    //   params.append('location', selectedLocation);
    // }
    // subLocation이 선택되어 있을 때
    if (selectedSubLocation !== '') {
      params.append('sub_location', selectedSubLocation);
    }
    // 날짜가 선택되어 있을 때
    if (selectedDate !== '') {
      params.append('time', selectedDate);
    }

    const res = await api.get('api/tickets/filter/', {
      params,
    });

    const dataTmp = res.data;
    if (!params.has('movie')) {
      this.handleMovieList(dataTmp.movie);
    }

    // location 이 선택되었을 때에만 subLocation 리스트 갱신
    if (selectedLocation !== '' && lastSelected !== 'subLocation') {
      params.append('location', selectedLocation);
      const res2 = await api.get('api/tickets/filter/', {
        params,
      });

      this.handleSubLocationList(res2.data.subLocation);
    }

    if (lastSelected === 'movie' || lastSelected === 'date') {
      this.handleLocationList(dataTmp.location);
    }

    if (lastSelected !== 'date') {
      this.handleDateList(dataTmp.date);
    }

    // 기존 선택되어있던 데이터 초기화 또는 유지 처리
    this.isSelectedDataValidate(dataTmp);

    // 세 개 전부 선택되면 time 보이기
    this.isReadyForTimeList(params);
  }

  async isReadyForTimeList(params) {
    const { movieTitle, location, subLocation, date } = this.props;

    if (movieTitle !== '' && subLocation !== '' && date !== '') {
      console.log(' 세개 다 선택 됨');
      params.append('location', location);
      const res = await api.get('api/tickets/filter/', {
        params,
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

  // 기존 선택되어있던 데이터 초기화 또는 유지 처리
  isSelectedDataValidate(dataTmp) {
    const {
      lastSelected,
      selectedMovieTitle,
      selectedLocation,
      selectedSubLocation,
      selectedDate,
      selectedTime,
    } = this.state;
    const { onMovie, onSubLocation, onDate, onTime } = this.props;

    // movie 처리
    if (lastSelected !== 'movie') {
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

    console.log(dataTmp);

    // date 처리
    if (lastSelected !== 'date') {
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
