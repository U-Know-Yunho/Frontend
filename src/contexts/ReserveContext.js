import React, { Component } from 'react';
import api from '../api';
const { Provider, Consumer } = React.createContext();

export default class ReserveProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // step: first -> step1, step: sec -> step2 컴포를 화면에 그림
            step: 'first',
            // 영화, 극장, 날짜, 시간, 인원수, 좌석
            // 선택된 영화 제목
            age: '',
            movieTitle: '',
            // 선택된 영화 포스터
            moviePoster: '',
            // 선택된 극장
            location: '',
            subLocation: '',
            // 선택된 날짜
            date: '',
            // 선택된 관, 시간, 총 좌석, 남은 좌석
            auditoriumName: '',
            currentSeatsNo: '',
            time: '',
            timePk: null,
            allSeat: 100,
            // 선택된 인원수
            number: 0,
            // 선택된 좌석
            seat: [],
            seatPk: [],
            // 선택된 좌석에 따른 가격
            price: 0,
            // 상태 변경 함수들
            onNumber: this.onNumber.bind(this),
            onMovie: this.onMovie.bind(this),
            onLocation: this.onLocation.bind(this),
            onSubLocation: this.onSubLocation.bind(this),
            onDate: this.onDate.bind(this),
            onTime: this.onTime.bind(this),
            onStep: this.onStep.bind(this),
            onSeatAdd: this.onSeatAdd.bind(this),
            onSeatDel: this.onSeatDel.bind(this),
            onSeatReset: this.onSeatReset.bind(this),
            onPricePlus: this.onPricePlus.bind(this),
            onPriceSub: this.onPriceSub.bind(this),
            onPriceReset: this.onPriceReset.bind(this),
            onBackToFirst: this.onBackToFirst.bind(this),
            onBackToSec: this.onBackToSec.bind(this),
            onReserve: this.onReserve.bind(this),
            // 예매 성공 시 true로 변환
            reserveSuccess: false,
        };
    }

    onStep(step) {
        this.setState({
            step,
        });
    }

    onMovie(movieTitle, moviePoster = '', age = '') {
        this.setState({
            movieTitle,
            moviePoster,
            age,
        });
    }

    onLocation(location) {
        this.setState({
            location,
        });
    }

    onSubLocation(subLocation) {
        this.setState({
            subLocation,
        });
    }

    onDate(date) {
        this.setState({
            date,
        });
    }

    onTime(time, timePk, auditoriumName, currentSeatsNo) {
        this.setState({
            time,
            timePk,
            auditoriumName,
            currentSeatsNo,
        });
    }

    onNumber(number) {
        this.setState({
            number,
        });
    }
    // 좌석 상태 변경
    onSeatAdd(seatName, pk) {
        const seat = this.state.seat;
        seat.push(seatName);
        seat.sort(function (x, y) {
            //FIXME: 좌석 배열 추가시 알파벳 비교 조건 완성하기
            if (x[0].localeCompare(y[0]) === 0) {
                if (x.slice(1) - y.slice(1) < 0) {
                    return -1;
                } else {
                    return 1;
                }
            } else if (x[0].localeCompare(y[0]) > 0) {
                return 1;
            } else {
                return -1;
            }
        });
        const seatPk = this.state.seatPk;
        seatPk.push(pk);
        seatPk.sort((x, y) => x - y);
        this.setState({
            seat,
            seatPk,
        });
    }
    onSeatDel(seatName, pk) {
        const seat = this.state.seat.filter(i => i !== seatName);
        const seatPk = this.state.seat.filter(p => p !== pk);
        this.setState({
            seat,
            seatPk,
        });
    }

    onSeatReset() {
        this.setState({
            seat: [],
            seatPk: [],
        });
    }

    // 가격 상태 변경
    onPricePlus() {
        const price = this.state.price;
        this.setState({
            price: price + 7000,
        });
    }
    onPriceSub() {
        const price = this.state.price;
        this.setState({
            price: price - 7000,
        });
    }
    onPriceReset() {
        this.setState({
            price: 0,
        });
    }

    // 좌석 선택 창에서 영화 선택창으로 되돌아 갈 때
    onBackToFirst() {
        this.setState({
            number: 0,
            seat: [],
            price: 0,
        });
    }

    // 결제 창에서 좌석 선택창으로 돌아 갈 때
    onBackToSec() {
        this.setState({
            number: 0,
            seat: [],
            price: 0,
        });
    }
    // 예매생성
    async onReserve() {
        const {
            timePk,
            seatPk,
            movieTitle,
            location,
            subLocation,
            date,
        } = this.state;
        // 선택된게 없는지 마지막에 한 번 더 확인
        if (
            movieTitle !== '' &&
            location !== '' &&
            subLocation !== '' &&
            date !== '' &&
            timePk &&
            seatPk !== []
        ) {
            try {
                await api.post('api/tickets/reservations/', {
                    screen: timePk,
                    seats: seatPk,
                });
                this.setState({
                    reserveSuccess: true,
                });
            } catch {
                alert('서버에 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        } else {
            alert('선택 사항을 다시 한 번 확인해주세요');
        }
    }
    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }
}

function withReserving(WrappedComponent) {
    return function WithReserving(props) {
        return (
            <Consumer>{value => <WrappedComponent {...value} {...props} />}</Consumer>
        );
    };
}

export { ReserveProvider, Consumer as ReserveConsumer, withReserving };
