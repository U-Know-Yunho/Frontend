import React, { Component } from 'react';
import Layout from '../components/Layout';
import qs from 'qs';
import ReserveProvider from '../contexts/ReserveContext';
import ReservationSteps from '../containers/ReservationSteps';

export default class ReservationPage extends Component {
  render() {
    const { location } = this.props;
    const { pk } = qs.parse(location.search, { ignoreQueryPrefix: true });
    // '/reservation' 경로면 pk 값 null
    // '/reservation/?moviePk=?' 경로면 특정 영화의 pk가 pk 값에 저장
    // firstStep component에서 선택된 영화 값으로 이 pk를 활용
    return (
      <Layout>
        <ReserveProvider>
          <ReservationSteps />
        </ReserveProvider>
      </Layout>
    );
  }
}
