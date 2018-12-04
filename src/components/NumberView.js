import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/NumberView.module.scss';

export default class NumberView extends Component {
  static defaultProps = {
    // 선택 인원 수
    number: 0,
  };
  render() {
    const num = [0, 1, 2, 3, 4, 5, 6, 7];
    const { number, onNumber } = this.props;
    return (
      <div className={s.numberWrapper}>
        <p>인원수</p>
        <ul>
          {num.map(n => (
            <li
              key={n}
              value={n}
              // 선택중인 값과 li의 값이 같다면 선택된 상태라는 클래스를 붙여서 다른 css를 적용한다.
              className={classNames({ [s.selected]: number === n })}
              onClick={e => onNumber(e)}
            >
              {n}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
