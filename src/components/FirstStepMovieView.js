import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepMovieView.module.scss';
import ageAdult from '../scss/age_X.png';
import age12 from '../scss/age_12.png';
import age15 from '../scss/age_15.png';
import ageAll from '../scss/age_O.png';

export default class FirstStepMovieView extends Component {
  handleAgeImg(age) {
    switch (age) {
      case '전체':
        return ageAll;
      case '12세 이상':
        return age12;
      case '15세 이상':
        return age15;
      case '청소년 관람불가':
        return ageAdult;
      default:
        return null;
    }
  }
  render() {
    const {
      movieShowList,
      movieNoneList,
      movieTitle,
      handleMovieClick,
      handleInvalidClick,
    } = this.props;

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
            <img src={this.handleAgeImg(m.age)} alt={m.age} />

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
