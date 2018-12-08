import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepTheaterView extends Component {
  handleLocation(l) {
    const {
      onLocation,
      onSubLocation,
      allLocationList,
      onSubLocationList,
    } = this.props;
    let subArr = [];
    for (const item of allLocationList) {
      if (item.location === l) {
        subArr.push(item.subLocation);
      }
    }
    onLocation(l);
    onSubLocation('');
    onSubLocationList(subArr);
  }

  handleSubLocation(l) {
    const { onSubLocation } = this.props;
    onSubLocation(l);
  }

  handleSubLocationList() {}

  render() {
    const {
      selectedLocationList,
      selectedSubLocationList,
      location,
      subLocation,
    } = this.props;
    return (
      <div className={s.eachDataBox}>
        <h3>극장</h3>
        <div className={s.locationWrapper}>
          <ul className={s.locationBox}>
            {selectedLocationList.map(t => (
              <li
                key={t}
                onClick={() => this.handleLocation(t)}
                className={classNames([s.locationLi], {
                  [s.selected]: t === location,
                })}
              >
                {t}
              </li>
            ))}
          </ul>
          <ul className={s.subLocationBox}>
            {location !== ''
              ? selectedSubLocationList.map(l => (
                  <li
                    key={l}
                    onClick={() => this.handleSubLocation(l)}
                    className={classNames({ [s.selected]: l === subLocation })}
                  >
                    {l}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    );
  }
}
