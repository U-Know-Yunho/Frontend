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
    const { lastSelected } = this.state;
    this.uploadListOneSelected();
    this.uploadListAllSelected();

    if (lastSelected === 'location') {
    }
  }

  // 방금 선택된 하나로만 데이터 갖고 오기
  // 기존에 선택된 것이 있을 때
  async uploadListOneSelected() {
    const {
      lastSelected,
      selectedMovieTitle,
      selectedLocation,
      selectedSubLocation,
      selectedDate,
    } = this.state;

    const params = new URLSearchParams();

    // location 은 movie나 date를 눌렀을 때에만 제어된다.
    if (lastSelected === 'movie') {
      params.append('movie', selectedMovieTitle);
    } else if (lastSelected === 'location') {
      params.append('location', selectedLocation);
    } else if (lastSelected === 'subLocation') {
      params.append('sub_location', selectedSubLocation);
    } else if (lastSelected === 'date') {
      params.append('time', selectedDate);
    }

    const res = await api.get('api/tickets/filter/', {
      params,
    });
    const dataList = res.data;

    // 리스트들 업데이트
    // 방금 선택된 것이 아니지만 기존이 선택된 것이 있을 때에만 업데이트 후 재선택

    if (
      selectedMovieTitle !== '' &&
      (lastSelected === 'date' || lastSelected === 'subLocation')
    ) {
      this.handleMovieList(dataList.movie);
      this.isSelectedDataValidate('movie', dataList.movie);
    }
    // location은 subLocation 을 클릭할 때에는 변하면 안되므로 조건 추가
    // location은 늘 선택되어 있으므로 validate 검사 필요 없음

    if (
      selectedSubLocation === '' &&
      (lastSelected === 'movie' || lastSelected === 'date')
    ) {
      this.handleLocationList(dataList.location);
    }

    if (
      lastSelected === 'movie' ||
      lastSelected === 'date' ||
      lastSelected === 'location'
    ) {
      params.append('location', selectedLocation);
      const res2 = await api.get('api/tickets/filter/', {
        params,
      });
      const dataList2 = res2.data;
      this.handleSubLocationList(dataList2.subLocation);
      this.isSelectedDataValidate('subLocation', dataList2.subLocation);
    }

    if (
      selectedDate !== '' &&
      (lastSelected === 'movie' || lastSelected === 'subLocation')
    ) {
      this.handleDateList(dataList.date);
      this.isSelectedDataValidate('date', dataList.date);
    }
  }

  // 지금까지 선택된 것들로 데이터 갖고 오기
  // 기존에 선택된 것이 없을 때
  async uploadListAllSelected() {
    const {
      lastSelected,
      selectedMovieTitle,
      selectedLocation,
      selectedSubLocation,
      selectedDate,
    } = this.state;

    const params = new URLSearchParams();

    if (selectedMovieTitle !== '') {
      params.append('movie', selectedMovieTitle);
    }

    if (selectedDate !== '') {
      params.append('time', selectedDate);
    }

    if (selectedSubLocation !== '') {
      params.append('location', selectedLocation);
      params.append('sub_location', selectedSubLocation);
    }
    const res = await api.get('api/tickets/filter/', {
      params,
    });

    const dataList = res.data;

    // 방금 선택된 것이 아니지만 기존이 선택된 것이 없을 때에만 업데이트
    if (selectedMovieTitle === '' && lastSelected !== 'movie') {
      this.handleMovieList(dataList.movie);
    }

    // location 은 늘 선택되어 있으므로 처리해줄 필요 없음.

    if (
      // subLocation 은 선택된 location 을 params에 넣어줌 그래야 리스트가 반환됨.
      // location 은 늘 선택되어 있음
      selectedSubLocation === '' &&
      lastSelected !== 'subLocation'
    ) {
      params.append('location', selectedLocation);
      const res2 = await api.get('api/tickets/filter/', {
        params,
      });

      const dataList2 = res2.data;
      this.handleSubLocationList(dataList2.subLocation);
    }
    if (selectedDate === '' && lastSelected !== 'date') {
      this.handleDateList(dataList.date);
    }

    // 만약 dataList에 time 리스트가 반환된다면 다 선택되었다는 것
    // 이때 타임 뿌려주기
    if (dataList.time) {
      console.log('조건 전부 선택 완료');
      this.isReadyForTimeList(dataList.time);
    }
  }

  // 기존 선택되어있던 데이터 초기화 또는 유지 처리
  async isSelectedDataValidate(selectedName, selectedData) {
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
    if (selectedName === 'movie') {
      const findMovie = selectedData.find(m => m.title === selectedMovieTitle);
      // findMovie 찾았지만 show가 false 일 때
      if (findMovie && !findMovie.show) {
        onMovie('', '');
        this.setState(
          {
            selectedMovieTitle: '',
          }
          //   () => this.upLoadList()
        );
      }
    }

    // subLocation 처리
    if (selectedName === 'subLocation') {
      const findSubLocation = selectedData.find(
        s => s.subLocation === selectedSubLocation
      );
      if (findSubLocation && !findSubLocation.show) {
        onSubLocation('');
        this.setState(
          {
            selectedSubLocation: '',
          }
          //   () => this.upLoadList()
        );
      }
    }

    // date 처리
    if (selectedName === 'date') {
      const findDate = selectedData.find(d => d[0].date === selectedDate);
      if (findDate && !findDate[1].show) {
        onDate('');
        this.setState(
          {
            selectedDate: '',
          }
          //   () => this.upLoadList()
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
