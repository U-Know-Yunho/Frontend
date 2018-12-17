import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import MyInfo from '../containers/MyInfo';
import { withUser } from '../contexts/UserContext';

class MyCGVInfoPage extends Component {
  render() {
    return (
      <Layout>
        <MyCGVLayout>{this.props.infoLoading && <MyInfo />}</MyCGVLayout>
      </Layout>
    );
  }
}

export default withUser(MyCGVInfoPage);
