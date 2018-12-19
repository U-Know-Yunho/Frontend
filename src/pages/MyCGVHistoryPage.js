import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import HistoryList from '../components/HistoryList';

export default class MyCGVHistoryPage extends Component {
  render() {
    return (
      <Layout>
        <MyCGVLayout>
          <h3>내가 본 영화</h3>
          {!this.props.listsLoading && <HistoryList />}
        </MyCGVLayout>
      </Layout>
    );
  }
}
