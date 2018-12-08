import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';

export default class MyCGVInfoPage extends Component {
  render() {
    return (
      <Layout>
        <MyCGVLayout>
          <h3>My CGV Info Page</h3>;
        </MyCGVLayout>
      </Layout>
    );
  }
}
