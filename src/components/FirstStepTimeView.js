import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';
import { link } from 'fs';
import classNames from 'classnames';

export default class FirstStepTimeView extends Component {
  render() {
    const { time, timeList, handleTimeClick } = this.props;
    return (
      <div className={s.eachDataBox}>
        <h3>시간</h3>
        <div>
          <ul>
            {timeList.map(t => (
              <li
                key={t.times}
                onClick={() => handleTimeClick(t.times, t.pk)}
                className={classNames({
                  [s.selected]: t.times === time,
                })}
              >
                {t.times}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
