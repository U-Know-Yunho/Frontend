import React, { Component } from 'react';
import s from '../scss/FirstStepMovieView.module.scss';

export default class FirstStepMovieView extends Component {
  handleMovieTitle(str) {
    const { onMovieTitle } = this.props;
    onMovieTitle(str);
  }
  render() {
    const { selectedMovieList } = this.props;
    return (
      <div className={s.movieBox}>
        <h3>영화</h3>
        <ul>
          {selectedMovieList.map(m => (
            <li key={m.title} onClick={() => this.handleMovieTitle(m.title)}>
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
