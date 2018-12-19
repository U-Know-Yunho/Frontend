import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import CancledList from '../components/CancledList';

export default class MyCGVCanceledPage extends Component {
  render() {
    return (
      <Layout>
        <MyCGVLayout>
          <h3>취소내역</h3>
          {!this.props.listsLoading && <CancledList />}
        </MyCGVLayout>
      </Layout>
    );
  }
}
