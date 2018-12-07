import React, { Component } from 'react';
import s from '../scss/EachSeat.module.scss';

// 각 좌석의 체크박스 입니다.
// 체크박스는 제어되는 체크박스입니다.
export default class EachSeat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: this.props.isReserved,
    };
  }

  handleCheck() {
    // 인원 수에 따른 좌석 선택 로직
    // 예약 되어있는 좌석의 경우 상태변화가 일어나지 않습니다.
    const {
      number,
      isReserved,
      selected,
      onDecreaseSelect,
      onIncreaseSelect,
    } = this.props;

    // 선택 인원이 0일 때는 아무것도 할 수 없습니다
    if (number === 0) {
      alert('인원 수를 선택해주세요');
    } else if (!isReserved) {
      // 선택 인원이 1명 이상 일 때, 예약 가능 좌석 클릭 시 로직
      if (this.state.isChecked) {
        // 클릭한 좌석이 현재 선택 중인 좌석일 때
        // 1.상태를 선택되지 않음으로 변경
        // 2.SeatView에서 카운트 중인 현재 선택된 좌석 수에서 마이너스 1
        this.setState(prevState => ({
          isChecked: !prevState.isChecked,
        }));
        onDecreaseSelect();
      } else {
        // 클릭한 좌석이 현재 선택 중이지 않은 좌석일 때
        if (selected < number) {
          // 현재 선택된 좌석의 수가 선택한 인원 수 보다 작을 때만
          // 1.상태를 선택됨으로 변경
          // 2.SeatView에서 카운트 중인 현재 선택된 좌석 수에서 플러스 1
          this.setState(prevState => ({
            isChecked: !prevState.isChecked,
          }));
          onIncreaseSelect();
        } else if (selected >= number) {
          // 현재 선택 중인 좌석 수가 선택한 인원 수와 같거나 많을 때
          alert('인원 수를 초과하셨습니다');
        }
      }
    } else if (isReserved) {
      // 예약된 좌석 클릭 시
      alert('이미 예약된 좌석은 선택할 수 없습니다');
    }
  }

  render() {
    const { row, colNum } = this.props;
    return (
      <div className={s.eachSeat}>
        <input
          type="checkbox"
          id={`seat${row}${colNum}`}
          checked={this.state.isChecked}
          onChange={() => this.handleCheck()}
        />
        <label for={`seat${row}${colNum}`} />
      </div>
    );
  }
}
