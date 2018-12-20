import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import ReservedList from '../containers/ReservedList';
import { withMyMovie } from '../contexts/MyMovieContext';
import { Helmet } from 'react-helmet';

export default class MyCGVPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>마이페이지, CGV</title>
        </Helmet>
        <MyCGVLayout>
          <h3>나의 예매 내역</h3>
          <ReservedList />
        </MyCGVLayout>
      </Layout>
    );
  }
}
