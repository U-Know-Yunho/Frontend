import React, { Component } from 'react';
import s from './LoginForm.module.scss';

export default class RegisterFormView extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <h1>Join</h1>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
    );
  }
}
