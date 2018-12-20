import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import CanceledList from '../components/CanceledList';
import { Helmet } from 'react-helmet';

export default class MyCGVCanceledPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>취소 내역, CGV</title>
        </Helmet>
        <MyCGVLayout>
          <h3>취소 내역</h3>
          {!this.props.listsLoading && <CanceledList />}
        </MyCGVLayout>
      </Layout>
    );
  }
}
