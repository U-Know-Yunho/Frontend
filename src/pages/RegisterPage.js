import React, { Component } from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../containers/RegisterForm';
import s from '../scss/LoginPage.module.scss';
import { Helmet } from 'react-helmet';

export default class RegisterPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>회원 가입, CGV</title>
        </Helmet>
        <div className={s.loginWrapper}>
          <RegisterForm />
        </div>
      </Layout>
    );
  }
}
