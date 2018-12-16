import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepTheaterView extends Component {
  render() {
    const {
      locationList,
      subLocationShowList,
      subLocationNoneList,
      location,
      subLocation,
      handleLocationClick,
      handleSubLocationClick,
    } = this.props;
    return (
      <div className={s.eachDataBox}>
        <h3>극장</h3>
        <div className={s.locationWrapper}>
          <ul className={s.locationBox}>
            {locationList.map(t => (
              <li
                key={t[0].location}
                onClick={() => handleLocationClick(t)}
                className={classNames([s.locationLi], {
                  [s.selected]: t[0].location === location,
                })}
              >
                {t[0].location}({t[2].num})
              </li>
            ))}
          </ul>
          <ul className={s.subLocationBox}>
            {subLocationShowList !== []
              ? subLocationShowList.map(l => (
                  <li
                    key={l.subLocation}
                    onClick={() => handleSubLocationClick(l.subLocation)}
                    className={classNames({
                      [s.selected]: l.subLocation === subLocation,
                    })}
                  >
                    {l.subLocation}
                  </li>
                ))
              : null}
            {subLocationNoneList !== []
              ? subLocationNoneList.map(l => (
                  <li key={l.subLocation} className={s.movieNoneLi}>
                    {l.subLocation}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    );
  }
}
