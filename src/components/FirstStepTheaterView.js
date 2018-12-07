import React, { Component } from 'react';
import s from '../scss/FirstStepTheaterView.module.scss';

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
  render() {
    const { selectedLocationList, selectedSubLocationList } = this.props;
    // 0: {pk: 3, location: "독도", subLocation: "울릉도"}
    // 1: {pk: 2, location: "시흥시", subLocation: "배곧동"}
    // 2: {pk: 1, location: "서울시", subLocation: "성북지점"}
    return (
      <div className={s.theaterBox}>
        <h3>극장</h3>
        <div className={s.locationWrapper}>
          <ul className={s.locationBox}>
            {selectedLocationList.map(t => (
              <li key={t} onClick={() => this.handleLocation(t)}>
                {t}
              </li>
            ))}
          </ul>
          <ul className={s.subLocationBox}>
            {selectedSubLocationList
              ? selectedSubLocationList.map(l => (
                  <li key={l} onClick={() => this.handleSubLocation(l)}>
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
