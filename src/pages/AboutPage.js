import React, { Component } from 'react';
import Layout from '../components/Layout';
import About from '../containers/About';
import s from '../scss/AboutPage.module.scss';

export default class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <div className={s.loginWrapper}>
          <About />
        </div>
      </Layout>
    );
  }
}
