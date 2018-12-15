import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepView.module.scss';
import api from '../api';

export default class FirstStepMovieView extends Component {
  render() {
    const {
      movieShowList,
      movieNoneList,
      movieTitle,
      handleMovieClick,
    } = this.props;

    return (
      <div className={s.eachDataBox}>
        <h3>영화</h3>
        <ul className={s.scrollBox}>
          {movieShowList.map(m => (
            <li
              key={m.title}
              onClick={() => handleMovieClick(m.pk)}
              className={classNames([s.movieLi], {
                [s.selected]: m.title === movieTitle,
              })}
            >
              {m.title}
            </li>
          ))}
          {movieNoneList.map(m => (
            <li key={m.title} className={s.movieNoneLi}>
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
