import React, { Component } from 'react';
import s from '../scss/FirstStepDateView.module.scss';
import classNames from 'classnames';

export default class FirstStepDateView extends Component {
  handleDateList(list) {
    return list.map(li => li.map(l => l[0].date.split('-')).map(t => t[2]));
  }
  handleDayList(list) {
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    let firstDay = today.getDay();
    const dayArr = [];
    for (const l of list) {
      let arr = [];
      for (let i = 0; i < l.length; i++) {
        arr.push(weekDay[firstDay++ % 7]);
      }
      dayArr.push(arr);
    }
    return dayArr;
  }
  getYear(date, n) {
    const tmp = date.date.split('-')[0];
    if (n === 2) return [parseInt(tmp), parseInt(tmp) + 1];
    else return [tmp];
  }
  getMonth(date, n) {
    const tmp = date.date.split('-')[1];
    if (n === 2) return [parseInt(tmp), (parseInt(tmp) + 1) % 12];
    else return tmp;
  }
  cutForNextMonth(list) {
    const monthGroup = [];
    list.forEach((item, idx) => {
      if (item[0].date.split('-')[2] === '01') {
        monthGroup.push(list.slice(0, idx));
        monthGroup.push(list.slice(idx, list.length));
      }
    });
    return monthGroup;
  }
  render() {
    const { dateList } = this.props;
    const monthGroup = this.cutForNextMonth(dateList);
    const year = this.getYear(dateList[0][0], monthGroup.length);
    const month = this.getMonth(dateList[0][0], monthGroup.length);
    return (
      <div className={s.dateBox}>
        {monthGroup.map((group, index) => (
          <ul key={group}>
            <li className={s.year}>{year[index]}</li>
            <li className={s.month}>{month[index]}</li>
            {this.renderTemplate(group, index)}
          </ul>
        ))}
      </div>
    );
  }

  renderTemplate = (group, index) => {
    const { handleDateClick, date, dateList, handleInvalidClick } = this.props;
    const monthGroup = this.cutForNextMonth(dateList);
    const dateGroup = this.handleDateList(monthGroup);
    const dayGroup = this.handleDayList(monthGroup);

    return group.map((d, idx) =>
      d[1].show ? (
        <li
          key={d[0].date}
          onClick={() => handleDateClick(d[0].date)}
          className={classNames(
            {
              [s.selected]: d[0].date === date,
            },
            [s.dateLi]
          )}
        >
          <div className={s.dateAndDay}>
            <span>{dayGroup[index][idx]}</span>
            <span className={s.date}>{dateGroup[index][idx]}</span>
          </div>
        </li>
      ) : (
        <li
          key={d[0].date}
          onClick={() => handleInvalidClick()}
          className={s.movieNoneLi}
        >
          <div className={s.dateAndDay}>
            <span>{dayGroup[index][idx]}</span>
            <span className={s.date}>{dateGroup[index][idx]}</span>
          </div>
        </li>
      )
    );
  };
}
