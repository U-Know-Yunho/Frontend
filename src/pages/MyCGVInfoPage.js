import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import MyInfo from '../containers/MyInfo';
import { withUser } from '../contexts/UserContext';
import { Helmet } from 'react-helmet';

class MyCGVInfoPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>정보수정, CGV</title>
        </Helmet>
        <MyCGVLayout><MyInfo /></MyCGVLayout>
      </Layout>
    );
  }
}

export default withUser(MyCGVInfoPage);
