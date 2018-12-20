import React, { Component } from 'react';
import Layout from '../components/Layout';
import About from '../containers/About';
import s from '../scss/AboutPage.module.scss';
// import { Helmet } from 'react-helmet';

export default class AboutPage extends Component {
  render() {
    return (
      <Layout>
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>나는 유노윤호다, CGV</title>
        </Helmet> */}
        <div className={s.aboutWrapper}>
          <h2>About</h2>
          <About />
        </div>
      </Layout>
    );
  }
}
