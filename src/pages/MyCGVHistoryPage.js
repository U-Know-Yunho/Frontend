import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import HistoryList from '../components/HistoryList';
// import { Helmet } from 'react-helmet';

export default class MyCGVHistoryPage extends Component {
  render() {
    return (
      <Layout>
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>내가 본 영화, CGV</title>
        </Helmet> */}
        <MyCGVLayout>
          <h3>내가 본 영화</h3>
          {!this.props.listsLoading && <HistoryList />}
        </MyCGVLayout>
      </Layout>
    );
  }
}
