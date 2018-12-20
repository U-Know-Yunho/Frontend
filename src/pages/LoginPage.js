import React, { Component } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../containers/LoginForm';
import s from '../scss/LoginPage.module.scss';
// import { Helmet } from 'react-helmet';

export default class LoginPage extends Component {
  render() {
    return (
      <Layout>
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>로그인, CGV</title>
        </Helmet> */}
        <div className={s.loginWrapper}>
          <LoginForm />
        </div>
      </Layout>
    );
  }
}
