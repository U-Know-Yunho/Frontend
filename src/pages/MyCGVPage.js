import React, { Component } from 'react';
import Layout from '../components/Layout';
import MyCGVLayout from '../components/MyCGVLayout';
import ReservedList from '../containers/ReservedList';
import { withMyMovie } from '../contexts/MyMovieContext';

class MyCGVPage extends Component {
  render() {
    console.log(this.props.readyList);
    return (
      <Layout>
        <MyCGVLayout>
          <h3>나의 예매 내역</h3>
          {!this.props.listsLoading && <ReservedList {...this.props} />}
        </MyCGVLayout>
      </Layout>
    );
  }
}

export default withMyMovie(MyCGVPage);
