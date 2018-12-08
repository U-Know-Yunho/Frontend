import React, { Component } from 'react';
import FirstStepMovie from './FirstStepMovie';
import FirstStepTheater from './FirstStepTheater';
import FirstStepDate from './FirstStepDate';
import FirstStepTime from './FirstStepTime';
import s from '../scss/FirstStep.module.scss';

export default class FirstStep extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pk } = this.props;
    return (
      <div className={s.firstStepWrapper}>
        <FirstStepMovie {...this.props} />
        <FirstStepTheater {...this.props} />
        <FirstStepDate {...this.props} />
        <FirstStepTime {...this.props} />
      </div>
    );
  }
}
