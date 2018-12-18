import React, { Component } from 'react';
import s from '../scss/FirstStepView.module.scss';
import classNames from 'classnames';
import withLoading from '../hoc/withLoading';

class FirstStepDateView extends Component {
  render() {
    const { handleDateClick, date, dateList, handleInvalidClick } = this.props;
    return (
      <div className={s.eachDataBox}>
        <h3>날짜</h3>
        <div>
          <ul className={s.scrollBox}>
            {dateList.map(d =>
              d[1].show ? (
                <li
                  key={d[0].date}
                  onClick={() => handleDateClick(d[0].date)}
                  className={classNames({
                    [s.selected]: d[0].date === date,
                  })}
                >
                  {d[0].date}
                </li>
              ) : (
                <li
                  key={d[0].date}
                  onClick={() => handleInvalidClick()}
                  className={s.movieNoneLi}
                >
                  {d[0].date}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default withLoading(FirstStepDateView);
