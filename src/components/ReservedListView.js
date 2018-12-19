import React, { Component } from 'react';

export default class ReservedListView extends Component {
  render() {
    const { list } = this.props;
    console.log(list);
    return <div>예매 내역</div>;
  }
}
