import React, { Component } from 'react';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import api from '../api';

export default class FirstStepTheater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationList: [],
      allLocationList: [],
      selectedSubLocationList: [],
      onSubLocationList: this.onSubLocationList.bind(this),
    };
  }

  async componentDidMount() {
    const { location } = this.props;
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
    if (location !== '') {
      let subArr = [];
      for (const item of list) {
        if (item.location === location) {
          subArr.push(item.subLocation);
        }
      }
      this.onSubLocationList(subArr);
    }
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
