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
