import React, { Component } from 'react';
import s from '../scss/FirstStepTimeView.module.scss';
import classNames from 'classnames';

export default class FirstStepTimeView extends Component {
  handleTimeList(list) {
    const tmp = list.map(l => l.times.split(':'));
    return tmp.map(t => t[0] + ':' + t[1]);
  }
  handleSpecTime(list) {
    return list.map(l => parseInt(l.times.split(':')[0]));
  }
  render() {
    // const { time, timeList, handleTimeClick } = this.props;
    const { time, handleTimeClick } = this.props;
    const timeList = [
      {
        times: '01:01:00',
        currentSeatsNo: '100',
        auditorium: '1',
      },
      {
        times: '10:02:01',
        currentSeatsNo: '99',
        auditorium: '2',
      },
      {
        times: '09:03:00',
        currentSeatsNo: '0',
        auditorium: '1',
      },
      {
        times: '14:04:00',
        currentSeatsNo: '0',
        auditorium: '1',
      },
    ];
    const times = this.handleTimeList(timeList);
    const specialTimes = this.handleSpecTime(timeList);
    console.log(specialTimes);
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
                      [s.jojo]:
                        specialTimes[idx] <= 10 && specialTimes[idx] >= 7,
                    },
                    {
                      [s.night]:
                        specialTimes[idx] <= 5 && specialTimes[idx] >= 0,
                    }
                  )}
                >
                  <span className={s.time}>{times[idx]}</span>
                  <span className={s.auditorium}> {t.auditorium}관 </span>
                  <span className={s.currentSeatsNo}>
                    [잔여{t.currentSeatsNo}석]
                  </span>
                </div>
              </li>
            ) : (
              <li
                key={t.times}
                onClick={() =>
                  handleTimeClick(t.times, t.pk, t.auditorium, t.currentSeatsNo)
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
                        specialTimes[idx] <= 5 && specialTimes[idx] >= 0,
                    }
                  )}
                >
                  <span className={s.time}>{times[idx]}</span>
                  <span className={s.auditorium}> {t.auditorium}관 </span>
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
