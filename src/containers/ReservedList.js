import React, { Component } from 'react';
import ReservedListView from '../components/ReservedListView';

export default class ReservedList extends Component {
  render() {
    console.log(this.props.readyList);
    return <ReservedListView list={this.props.readyList} />;
  }
}
