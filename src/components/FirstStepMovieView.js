import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/FirstStepView.module.scss';

export default class FirstStepMovieView extends Component {
  handleMovieTitle(str, url) {
    const { onMovieTitle, onMoviePoster } = this.props;
    onMovieTitle(str);
    onMoviePoster(url);
  }
  render() {
    const { selectedMovieList, movieTitle } = this.props;
    return (
      <div className={s.eachDataBox}>
        <h3>영화</h3>
        <ul className={s.scrollBox}>
          {selectedMovieList.map(m => (
            <li
              key={m.title}
              onClick={() => this.handleMovieTitle(m.title, m.mainImgUrl)}
              className={classNames([s.movieLi], {
                [s.selected]: m.title === movieTitle,
              })}
            >
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
