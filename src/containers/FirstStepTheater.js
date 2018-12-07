import React, { Component } from 'react';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import api from '../api';

export default class FirstStepTheater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationList: [],
      allLocationList: [],
      //   0: {pk: 9, location: "서울", subLocation: "목동"}
      //   1: {pk: 8, location: "서울", subLocation: "성신여대"}
      //   2: {pk: 7, location: "서울", subLocation: "명동"}
      //   3: {pk: 6, location: "인천", subLocation: "남주안"}
      //   4: {pk: 5, location: "인천", subLocation: "계양"}
      //   5: {pk: 4, location: "서울", subLocation: "강변"}
      //   6: {pk: 3, location: "독도", subLocation: "울릉도"}
      //   7: {pk: 2, location: "경기", subLocation: "시흥"}
      //   8: {pk: 1, location: "서울", subLocation: "성북지점"}

      selectedSubLocationList: [],
      //   ["서울", "인천", "독도", "경기"]
      onSubLocationList: this.onSubLocationList.bind(this),
    };
  }

  async componentDidMount() {
    const { data: list } = await api.get('api/theaters/list/');
    const arr = [];
    for (const item of list) {
      if (arr.includes(item.location)) {
        continue;
      } else {
        arr.push(item.location);
      }
    }
    this.setState({
      selectedLocationList: arr,
      allLocationList: list,
    });
  }

  onSubLocationList(selectedSubLocationList) {
    this.setState({
      selectedSubLocationList,
    });
  }

  render() {
    return <FirstStepTheaterView {...this.props} {...this.state} />;
  }
}
