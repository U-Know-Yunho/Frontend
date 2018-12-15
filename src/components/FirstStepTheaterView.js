import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepTheaterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subLocationShowList: [],
      subLocationNoneList: [],
    };
  }

  handleLocation(t) {
    const { onLocation } = this.props;
    onLocation(t[0].location);
    const subLocationShowList = t[1].theaterSet.filter(t => t.show);
    const subLocationNoneList = t[1].theaterSet.filter(t => !t.show);

    this.setState({
      subLocationShowList,
      subLocationNoneList,
    });
  }

  handleSubLocation(s) {
    const { onSubLocation } = this.props;
    onSubLocation(s);
  }

  render() {
    const { theaterList, location, subLocation } = this.props;
    const { subLocationShowList, subLocationNoneList } = this.state;
    return (
      <div className={s.eachDataBox}>
        <h3>극장</h3>
        <div className={s.locationWrapper}>
          <ul className={s.locationBox}>
            {theaterList.map(t => (
              <li
                key={t[0].location}
                onClick={() => this.handleLocation(t)}
                className={classNames([s.locationLi], {
                  [s.selected]: t[0].location === location,
                })}
              >
                {t[0].location} ({t[2].num})
              </li>
            ))}
          </ul>
          <ul className={s.subLocationBox}>
            {subLocationShowList !== []
              ? subLocationShowList.map(l => (
                  <li
                    key={l.subLocation}
                    onClick={() => this.handleSubLocation(l.subLocation)}
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
