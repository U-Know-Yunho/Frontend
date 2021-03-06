import React, { Component } from 'react';
import s from '../scss/FirstStepTimeView.module.scss';
import classNames from 'classnames';

export default class FirstStepTimeView extends Component {
  handleTimeList(list) {
    const tmp = list.map(l => l.times.split(':'));
    return tmp.map(t => t[0] + ':' + t[1]);
  }
  handleTime(t) {
    const tmp = t.split(':');
    return tmp[0] + ':' + tmp[1];
  }
  handleSpecTime(list) {
    return list.map(l => parseInt(l.times.split(':')[0]));
  }
  render() {
    const { time, timeList, handleTimeClick } = this.props;
    const times = this.handleTimeList(timeList);
    const specialTimes = this.handleSpecTime(timeList);
    return (
      <div className={s.timeWrapper}>
        <ul>
          <li className={s.dayNight}>
            <span className={classNames([s.jojo], [s.jojoTitle])}>조조</span>
            <span className={classNames([s.night], [s.nightTitle])}>심야</span>
          </li>
          {timeList.map((t, idx) =>
            t.currentSeatsNo === '0' ? (
              <li
                key={t.times}
                className={classNames(
                  {
                    [s.selected]: t.times === time,
                  },
                  [s.movieNoneLi]
                )}
              >
                <div
                  className={classNames(
                    [s.timeInfo],
                    {
                      [s.night]:
                        specialTimes[idx] >= 22 || specialTimes[idx] <= 5,
                    },
                    {
                      [s.jojo]:
                        specialTimes[idx] <= 10 && specialTimes[idx] >= 7,
                    }
                  )}
                >
                  <span className={s.time}>{times[idx]}</span>
                  <span className={s.auditorium}> {t.auditoriumName} </span>
                  <span className={s.currentSeatsNo}>
                    [잔여{t.currentSeatsNo}석]
                  </span>
                </div>
              </li>
            ) : (
              <li
                key={t.times}
                onClick={() =>
                  handleTimeClick(
                    t.times,
                    t.pk,
                    t.auditoriumName,
                    t.currentSeatsNo
                  )
                }
                className={classNames(
                  {
                    [s.selected]: t.times === time,
                  },
                  [s.timeLi]
                )}
              >
                <div
                  className={classNames(
                    [s.timeInfo],
                    {
                      [s.jojo]:
                        specialTimes[idx] <= 10 && specialTimes[idx] >= 7,
                    },
                    {
                      [s.night]:
                        specialTimes[idx] >= 22 || specialTimes[idx] <= 5,
                    }
                  )}
                >
                  <span className={s.time}>{times[idx]}</span>
                  <span className={s.auditorium}> {t.auditoriumName} </span>
                  <span className={s.currentSeatsNo}>
                    [잔여{t.currentSeatsNo}석]
                  </span>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}
