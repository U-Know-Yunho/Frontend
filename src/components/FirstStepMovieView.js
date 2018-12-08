import React, { Component } from 'react';
import s from '../scss/FirstStepMovieView.module.scss';

export default class FirstStepMovieView extends Component {
  handleMovieTitle(str, url) {
    const { onMovieTitle, onMoviePoster } = this.props;
    onMovieTitle(str);
    onMoviePoster(url);
  }
  render() {
    const { selectedMovieList } = this.props;
    return (
      <div className={s.movieBox}>
        <h3>영화</h3>
        <ul>
          {selectedMovieList.map(m => (
            <li
              key={m.title}
              onClick={() => this.handleMovieTitle(m.title, m.mainImgUrl)}
            >
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
