import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';
import ss from '../scss/withLoading.module.scss';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import FirstStepMovieView from '../components/FirstStepMovieView';
import FirstStepTimeView from '../components/FirstStepTimeView';
import FirstStepDateView from '../components/FirstStepDateView';

import classNames from 'classnames';

export default class FirstStepView extends Component {
  render() {
    return (
      <div className={s.dataBoxesWrapper}>
        <div
          className={classNames(
            {
              [s.loadingDisplay]: this.props.loading,
            },
            [s.basicDisplay]
          )}
        >
          {/* component위에 그려야하는 작업이므로 withLoading 사용 안하고 따로 빼줌 ㅠㅠ */}
          <div
            className={classNames(
              [ss.ispinner],
              [ss.ispinner__animating],
              [ss.ispinner__gray]
            )}
          >
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
            <div className={ss.ispinner__blade} />
          </div>
        </div>
        <div className={s.movieDataBox}>
          <FirstStepMovieView {...this.props} {...this.state} />
        </div>
        <div className={s.theaterDataBox}>
          <FirstStepTheaterView {...this.props} {...this.state} />
        </div>
        <div className={s.dateDataBox}>
          <FirstStepDateView {...this.props} {...this.state} />
        </div>
        <div className={s.timeDataBox}>
          <FirstStepTimeView {...this.props} {...this.state} />
        </div>
      </div>
    );
  }
}
