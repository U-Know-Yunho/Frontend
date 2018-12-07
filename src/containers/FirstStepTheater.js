import React, { Component } from 'react';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import api from '../api';

export default class FirstStepTheater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationList: [],
      selectedSubLocationList: [],
      onSubLocationList: this.onSubLocationList.bind(this),
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    if (location.trim() === '') {
      const { data: list } = await api.get('api/theaters/list/');
      this.setState({
        selectedLocationList: list,
      });
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
