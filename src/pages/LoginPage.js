import React, { Component } from 'react';
import Layout from '../components/Layout';
import LoginForm from '../containers/LoginForm';
import s from '../scss/LoginPage.module.scss';

export default class LoginPage extends Component {
  render() {
    return (
      <Layout>
        <div className={s.loginWrapper}>
          <LoginForm />
        </div>
      </Layout>
    );
  }
}
