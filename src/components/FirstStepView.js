import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';
import ss from '../scss/withLoading.module.scss';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import FirstStepMovieView from '../components/FirstStepMovieView';
import FirstStepDateView from '../components/FirstStepDateView';
import FirstStepTimeView from '../components/FirstStepTimeView';
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
          {/* <FirstStepDateView {...this.props} {...this.state} /> */}
        </div>
        <div className={s.timeDataBox}>
          <FirstStepTimeView {...this.props} {...this.state} />
        </div>
      </div>
    );
  }
}

// export default withLoading(FirstStepView);
