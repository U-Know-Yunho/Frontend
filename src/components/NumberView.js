import React, { Component } from 'react';
import classNames from 'classnames';
import s from '../scss/NumberView.module.scss';
import { withReserving } from '../contexts/ReserveContext';

class NumberView extends Component {
  static defaultProps = {
    // 선택 인원 수
    number: 0,
  };
  render() {
    const num = [0, 1, 2, 3, 4, 5, 6, 7];
    const {
      number,
      onNumber,
      onResetSelected,
      selected,
      onPriceReset,
    } = this.props;
    return (
      <div className={s.wrapper}>
        <p>인원</p>
        <ul>
          {num.map(n => (
            <li
              key={n}
              // 선택중인 값과 li의 값이 같다면 선택된 상태라는 클래스를 붙여서 다른 css를 적용한다.
              className={classNames({ [s.selected]: number === n })}
              onClick={() => {
                // 선택 중인 좌석이 있을 때는 인원 수 변경시 경고창 띄우기
                if (selected !== 0) {
                  alert('선택하신 좌석이 해제됩니다');
                }
                onNumber(n);
                onResetSelected();
                onPriceReset();
              }}
            >
              {n}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withReserving(NumberView);
