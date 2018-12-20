import React, { Component } from 'react';
import ThirdStepView from '../components/ThirdStepView';
import s from '../scss/ThirdStep.module.scss';

export default class ThirdStep extends Component {
  render() {
    return (
      <div className={s.thirdStepWrapper}>
        <ThirdStepView {...this.props} />
      </div>
    );
  }
}
