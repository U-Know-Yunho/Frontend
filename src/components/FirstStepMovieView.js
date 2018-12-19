import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepMovieView.module.scss';
import api from '../api';

export default class FirstStepMovieView extends Component {
  render() {
    const {
      movieShowList,
      movieNoneList,
      movieTitle,
      handleMovieClick,
      handleInvalidClick,
      movieAllList,
    } = this.props;

    // console.log(movieAllList);
    return (
      <ul className={s.movieBox}>
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
          <li
            key={m.title}
            onClick={() => handleInvalidClick()}
            className={s.movieNoneLi}
          >
            {m.title}
          </li>
        ))}
      </ul>
    );
  }
}
