import React, { Component } from 'react';
import Layout from '../components/Layout';
import ReserveProvider from '../contexts/ReserveContext';
import ReservationSteps from '../containers/ReservationSteps';
import s from '../scss/ReservationPage.module.scss';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import qs from 'qs';

export default class ReservationPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { location } = this.props;
    const p = new URLSearchParams(location.search);
    const pk = p.get('moviePk');
    // const { pk } = qs.parse(location.search, { ignoreQueryPrefix: true });
    // '/reservation' 경로면 pk 값 null
    // '/reservation/?moviePk=?' 경로면 특정 영화의 pk가 pk 값에 저장
    // firstStep component에서 선택된 영화 값으로 이 pk를 활용
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인 후 이용해주세요');
      return <Redirect to="/login" />;
    } else {
      return (
        <Layout>
          <Helmet>
            <meta charSet="utf-8" />
            <title>예매, CGV</title>
          </Helmet>
          <ReserveProvider>
            <div className={s.wrapper}>
              <ReservationSteps pk={pk} />
            </div>
          </ReserveProvider>
        </Layout>
      );
    }
  }
}
