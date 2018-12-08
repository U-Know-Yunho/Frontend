import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import MyInfo from '../containers/MyInfo';

export default class MyCGVInfoPage extends Component {
  render() {
    return (
      <Layout>
        <MyCGVLayout>
          <MyInfo />
        </MyCGVLayout>
      </Layout>
    );
  }
}
