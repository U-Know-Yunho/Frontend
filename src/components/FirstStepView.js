import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';
import FirstStepTheaterView from '../components/FirstStepTheaterView';
import FirstStepMovieView from '../components/FirstStepMovieView';
import FirstStepDateView from '../components/FirstStepDateView';
import FirstStepTimeView from '../components/FirstStepTimeView';
import classNames from 'classnames';
import withLoading from '../hoc/withLoading';

class FirstStepView extends Component {
  render() {
    return (
      <div
        className={classNames([s.dataBoxesWrapper], {
          [s.loadingWrapper]: this.props.loading,
        })}
      >
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

export default withLoading(FirstStepView);
