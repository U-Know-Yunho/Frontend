import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import ReservedList from '../containers/ReservedList';
import { withMyMovie } from '../contexts/MyMovieContext';

export default class MyCGVPage extends Component {
  render() {
    return (
      <Layout>
        <MyCGVLayout>
          <h3>나의 예매 내역</h3>
          <ReservedList />
        </MyCGVLayout>
      </Layout>
    );
  }
}
