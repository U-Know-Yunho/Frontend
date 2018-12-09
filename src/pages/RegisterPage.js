import React, { Component } from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../containers/RegisterForm';
import s from '../scss/LoginPage.module.scss';

export default class RegisterPage extends Component {
  render() {
    return (
      <Layout>
        <div className={s.loginWrapper}>
          <RegisterForm />
        </div>
      </Layout>
    );
  }
}
