import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepTheaterView.module.scss';

export default class FirstStepTheaterView extends Component {
  render() {
    const {
      locationList,
      //   subLocationShowList,
      //   subLocationNoneList,
      location,
      subLocation,
      handleLocationClick,
      handleSubLocationClick,
      handleInvalidClick,
    } = this.props;
    const subLocationShowList = [
      {
        subLocation: '강남',
        // show:'true'
      },
    ];
    const subLocationNoneList = [
      {
        subLocation: '영통',
      },
    ];
    return (
      <div className={s.locationWrapper}>
        <ul className={s.locationBox}>
          {locationList.map(t =>
            t.num === 0 ? (
              <li
                key={t.location}
                onClick={() => handleInvalidClick()}
                className={[s.locationLi]}
              >
                {t.location}({t.num})
              </li>
            ) : (
              <li
                key={t.location}
                onClick={() => handleLocationClick(t.location)}
                className={classNames([s.locationLi], {
                  [s.selected]: t.location === location,
                })}
              >
                {t.location}({t.num})
              </li>
            )
          )}
        </ul>
        <ul className={s.subLocationBox}>
          {subLocationShowList !== []
            ? subLocationShowList.map(l => (
                <li
                  key={l.subLocation}
                  onClick={() => handleSubLocationClick(l.subLocation)}
                  className={classNames([s.subLocationLi], {
                    [s.selected]: l.subLocation === subLocation,
                  })}
                >
                  {l.subLocation}
                </li>
              ))
            : null}
          {subLocationNoneList !== []
            ? subLocationNoneList.map(l => (
                <li
                  key={l.subLocation}
                  onClick={() => handleInvalidClick()}
                  className={classNames([s.subLocationLi], [s.movieNoneLi])}
                >
                  {l.subLocation}
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
}
