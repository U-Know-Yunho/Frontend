import React, { Component } from 'react';
import s from '../scss/EachSeat.module.scss';
import c from 'classnames';

// 각 좌석입니다.
// 체크박스는 제어되는 체크박스입니다.
export default class EachSeat extends Component {
  constructor(props) {
    super(props);

    // 예약되어있는 좌석은 초기값 true, 예약 가능 좌석 초기값 false
    this.state = {
      isChecked: this.props.isReserved,
    };
  }

  handleCheck() {
    // 인원 수에 따른 좌석 선택 로직
    // 예약 되어있는 좌석의 경우 상태변화가 일어나지 않습니다.
    const {
      number,
      seatName,
      seatPk,
      isReserved,
      selected,
      onDecreaseSelect,
      onIncreaseSelect,
      onSeatAdd,
      onSeatDel,
      onPricePlus,
      onPriceSub,
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
        // 3.컨텍스트에 저장해둔 좌석 삭제
        this.setState({
          isChecked: false,
        });
        // 현재 선택중인 인원 수 빼기
        onDecreaseSelect();
        // 선택됐던 좌석 삭제
        onSeatDel(seatName, seatPk);
        // 더했던 가격 빼기
        onPriceSub();
      } else {
        // 클릭한 좌석이 현재 선택 중이지 않은 좌석일 때
        if (selected < number) {
          // 현재 선택된 좌석의 수가 선택한 인원 수 보다 작을 때만
          // 1.상태를 선택됨으로 변경
          // 2.SeatView에서 카운트 중인 현재 선택된 좌석 수에서 플러스 1
          this.setState({
            isChecked: true,
          });
          onIncreaseSelect();
          onSeatAdd(seatName, seatPk);
          onPricePlus();
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
    const { seatPk } = this.props;
    return (
      <div className={s.eachSeat}>
        <input
          type="checkbox"
          id={seatPk}
          checked={this.state.isChecked}
          onChange={() => this.handleCheck()}
        />
        <label
          className={c({ [s.reserved]: this.props.isReserved })}
          for={seatPk}
        />
      </div>
    );
  }
}
